import { CircularLoader, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { generateLegendDefaults, uid } from "@scorecard/shared";
import React, { Suspense, useEffect, useState } from "react";
import { OrgUnitSpecificTargetView, PeriodSpecificTargetView } from "./SpecificTargetView";
import { head, isEmpty } from "lodash";
import PeriodSpecificTargetsModal from "../../PeriodSpecificTargetsModal";
import OrgUnitSpecificTargetsModal from "../../OrgUnitSpecificTargetsModal";
import OrgUnitLevelSpecificTargets from "../../OrgUnitLevelSpecificTargetsModal";
import { SpecificTarget } from "@hisptz/dhis2-analytics";
import { useFormContext, useWatch } from "react-hook-form";
import { getNonDefaultLegendDefinitions } from "../../../../../../../../General/utils/utils";


function getSelectedType(specificTargets: Array<SpecificTarget>, specificTargetsSet: boolean) {
	if (!isEmpty(specificTargets) && specificTargetsSet) {
		return head(specificTargets)?.type;
	}
	if (specificTargetsSet) {
		return "orgUnitLevel";
	}
	return null;
}

export function SpecificFieldsSelector({ path }: { path: string }) {
	const { setValue } = useFormContext();
	const [
		allLegendDefinitions,
		areSpecificTargetsSet,
		specificTargets,
		defaultLegends,
		weight,
		highIsGood
	] = useWatch({
		name: [
			"legendDefinitions",
			`${path}.specificTargetsSet`,
			`${path}.specificTargets`,
			`${path}.legends`,
			`${path}.weight`,
			`${path}.highIsGood`
		]
	});

	const legendDefinitions =
		getNonDefaultLegendDefinitions(allLegendDefinitions);

	const [openConfigDialog, setOpenConfigDialog] = useState(false);

	const [selectedType, setSelectedType] = useState(
		getSelectedType(specificTargets, areSpecificTargetsSet)
	);

	useEffect(() => {
		if (!areSpecificTargetsSet && !isEmpty(specificTargets)) {
			setSelectedType(null);
			setValue(`${path}.specificTargets`, []);
		}
	}, [areSpecificTargetsSet, specificTargets, setValue, path]);

	useEffect(() => {
		if (selectedType && selectedType != "orgUnitLevel") {
			if (isEmpty(specificTargets[0]?.items)) {
				setOpenConfigDialog(true);
			}
		}
	}, [selectedType, specificTargets]);


	return (
		<div style={{ gap: 8 }} className="column gap-16">
			<SingleSelectField
				label={i18n.t("Specific target type")}
				selected={selectedType ?? undefined}
				onChange={({ selected }: { selected: string; }) => {
					if (selected === "orgUnitLevel") {
						setSelectedType(selected);
						setValue(`${path}.legends`, []);
						setValue(`${path}.specificTargets`, []);
						return;
					}
					setSelectedType(selected);
					setValue(
						`${path}.legends`,
						generateLegendDefaults(
							{
								legendDefinitions,
								weight,
								highIsGood
							}
						)
					);

					setValue(`${path}.specificTargets`, [
						{
							id: uid(),
							type: selected,
							items: [],
							legends: generateLegendDefaults(
								{
									legendDefinitions,
									weight,
									highIsGood
								}
							)
						}
					]);
				}}
			>
				<SingleSelectOption
					value="periods"
					label={i18n.t("Period")}
				/>
				<SingleSelectOption
					value="orgUnit"
					label={i18n.t("Organisation Unit")}
				/>
				<SingleSelectOption
					value="orgUnitLevel"
					label={i18n.t("Organisation Unit Level")}
				/>
			</SingleSelectField>
			<div className="column gap-8">
				<Suspense
					fallback={
						<div
							className="column align-items-center justify-content-center"
							style={{ height: 100, width: "100%" }}
						>
							<CircularLoader small />
						</div>
					}
				>
					{selectedType !== "orgUnitLevel" &&
						specificTargets?.map((target: any) =>
							selectedType === "periods" ? (
								<PeriodSpecificTargetView
									defaultLegends={defaultLegends}
									legendDefinitions={
										legendDefinitions
									}
									onUpdate={() =>
										setOpenConfigDialog(true)
									}
									key={`${target.id}-view`}
									specificTarget={target}
								/>
							) : (
								<OrgUnitSpecificTargetView
									defaultLegends={defaultLegends}
									legendDefinitions={
										legendDefinitions
									}
									onUpdate={() =>
										setOpenConfigDialog(true)
									}
									key={`${target.id}-view`}
									specificTarget={target}
								/>
							)
						)}
				</Suspense>
			</div>
			{selectedType === "periods" &&
			openConfigDialog &&
			!isEmpty(specificTargets) ? (
				<PeriodSpecificTargetsModal
					path={path}
					defaultLegends={defaultLegends}
					onChangeDefaultLegends={(legends) =>
						setValue(`${path}.legends`, legends)
					}
					specificTarget={specificTargets[0]}
					onClose={() => setOpenConfigDialog(false)}
					open={openConfigDialog}
					onUpdate={(target) => {
						setOpenConfigDialog(false);
						setValue(`${path}.specificTargets`, [target]);
					}}
				/>
			) : null}
			{selectedType === "orgUnit" &&
			openConfigDialog &&
			!isEmpty(specificTargets) ? (
				<OrgUnitSpecificTargetsModal
					path={path}
					defaultLegends={defaultLegends}
					onChangeDefaultLegends={(legends) =>
						setValue(`${path}.legends`, legends)
					}
					specificTarget={specificTargets[0]}
					onClose={() => setOpenConfigDialog(false)}
					open={openConfigDialog}
					onUpdate={(target) => {
						setOpenConfigDialog(false);
						setValue(`${path}.specificTargets`, [target]);
					}}
				/>
			) : null}
			{selectedType === "orgUnitLevel" && (
				<OrgUnitLevelSpecificTargets path={path} />
			)}
		</div>
	);
}

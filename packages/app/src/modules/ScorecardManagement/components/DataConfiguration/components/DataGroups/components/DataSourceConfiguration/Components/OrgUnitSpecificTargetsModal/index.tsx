import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, CircularLoader, Field, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import { OrgUnitSelectorModal } from "@hisptz/dhis2-ui";
import { SelectedOrgUnits } from "@scorecard/shared";
import { isEmpty } from "lodash";
import React, { Dispatch, SetStateAction, Suspense, useCallback, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { getNonDefaultLegendDefinitions } from "../../../../../../../General/utils/utils";
import LegendsField from "../TargetsArea/components/LegendsField";
import { ScorecardLegend, SpecificTarget } from "@hisptz/dhis2-analytics";

function OrgUnitSelector({ target, setTarget }: { target: SpecificTarget, setTarget: Dispatch<SetStateAction<SpecificTarget>> }) {
	const [periodSelectorOpen, setPeriodSelectorOpen] = useState(
		isEmpty(target.items)
	);

	const orgUnits = useRecoilValue(SelectedOrgUnits(target.items));

	const label = orgUnits
		?.map((ou) => ou?.displayName)
		?.join(", ");

	return (
		<>
			<div className=" align-items-end row gap-8 w-100">
				<Field helpText={`Selected: ${label}`} label={i18n.t("Organisation unit")}>
					<Button onClick={() => setPeriodSelectorOpen(true)}>
						{!isEmpty(target.items) ? i18n.t("Change organisation unit") : i18n.t("Select organisation unit")}
					</Button>
				</Field>
			</div>
			{periodSelectorOpen && (
				<OrgUnitSelectorModal
					value={{
						orgUnits: orgUnits ?? []
					}}
					onClose={() => setPeriodSelectorOpen(false)}
					hide={!periodSelectorOpen}
					onUpdate={({ orgUnits }) => {
						setTarget((prevState) => {
							return {
								...prevState,
								items: orgUnits?.map(
									(orgUnit: { id: string; }) => orgUnit.id
								)
							};
						});
						setPeriodSelectorOpen(false);
					}}
				/>
			)}
		</>
	);
}

export default function OrgUnitSpecificTargetsModal({
														open,
														onClose,
														onUpdate,
														specificTarget,
														defaultLegends,
														onChangeDefaultLegends,
														path
													}: { path: string; open: boolean; onClose: () => void; onUpdate: (specificTarget: SpecificTarget) => void; specificTarget: SpecificTarget, defaultLegends: ScorecardLegend[]; onChangeDefaultLegends: (legends: ScorecardLegend[]) => void }) {
	const { getValues } = useFormContext();
	const [target, setTarget] = useState<SpecificTarget>(specificTarget);

	const legendDefinitions = getNonDefaultLegendDefinitions(
		getValues("legendDefinitions")
	);
	const highIsGood = useWatch({
		name: `${path}.highIsGood`
	});

	const onUpdateClick = useCallback(() => {
		onUpdate({
			...target
		});
		onClose();
	}, [onClose, onUpdate, target]);

	return (
		<Modal onClose={onClose} hide={!open} position="middle">
			<ModalTitle>
				{i18n.t("Organisation Unit Specific Targets")}
			</ModalTitle>
			<ModalContent>
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
					<div className="column w-100 gap-16">
						<OrgUnitSelector
							target={target}
							setTarget={setTarget}
						/>
						<div className="row">
							<div className="column w-100 legend-settings-area">
								<LegendsField
									highIsGood={highIsGood}
									legendDefinitions={legendDefinitions}
									value={target.legends}
									onChange={(legends) => {
										setTarget((prevState) => {
											return {
												...prevState,
												legends
											};
										});
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="column w-100 legend-settings-area">
								<p>{i18n.t("Other Periods")}</p>
								<LegendsField
									highIsGood={highIsGood}
									legendDefinitions={legendDefinitions}
									value={defaultLegends}
									onChange={onChangeDefaultLegends}
								/>
							</div>
						</div>
					</div>
				</Suspense>
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
					<Button onClick={onUpdateClick} primary>
						{i18n.t("Update")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}


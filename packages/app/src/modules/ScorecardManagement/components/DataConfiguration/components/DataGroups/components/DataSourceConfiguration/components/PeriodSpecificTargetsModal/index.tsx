import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Field, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import { PeriodSelectorModal } from "@hisptz/dhis2-ui";
import { useCalendar } from "@scorecard/shared";
import { compact, isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNonDefaultLegendDefinitions } from "../../../../../../../General/utils/utils";
import LegendsField from "../TargetsArea/components/LegendsField";
import { createFixedPeriodFromPeriodId } from "@dhis2/multi-calendar-dates";
import { ScorecardLegend, SpecificTarget } from "@hisptz/dhis2-analytics";

export default function PeriodSpecificTargetsModal({
													   open,
													   onClose,
													   onUpdate,
													   specificTarget,
													   defaultLegends,
													   onChangeDefaultLegends,
													   path
												   }: { onChangeDefaultLegends: (legends: ScorecardLegend[]) => void, open: boolean; onClose: () => void, onUpdate: (target: SpecificTarget) => void; specificTarget: SpecificTarget; defaultLegends: ScorecardLegend[], path: string; }) {
	const { watch } = useFormContext();
	const [target, setTarget] = useState(specificTarget);
	const calendar = useCalendar();
	const legendDefinitions = getNonDefaultLegendDefinitions(
		watch("legendDefinitions")
	);
	const highIsGood = watch(`${path}.highIsGood`);
	const [periodSelectorOpen, setPeriodSelectorOpen] = useState(
		isEmpty(target.items)
	);

	const onUpdateClick = useCallback(() => {
		onUpdate({
			...target
		});
		onClose();
	}, [onClose, onUpdate, target]);

	const label = target?.items
		?.map((item: any) => {
			if (item) {
				return createFixedPeriodFromPeriodId(
					{
						calendar: calendar,
						periodId: item
					}
				).displayName;
			}
		})
		?.join(", ");

	return (
		<Modal onClose={onClose} hide={!open} position="middle">
			<ModalTitle>{i18n.t("Period Specific Targets")}</ModalTitle>
			<ModalContent>
				<div className="column w-100 gap-16">
					<div className="row gap-8 w-100">
						<Field helpText={`Selected: ${label}`} label={i18n.t("Period")}>
							<Button onClick={() => setPeriodSelectorOpen(true)}>
								{isEmpty(target.items) ? i18n.t("Select Period") : i18n.t("Change Period")}
							</Button>
						</Field>
					</div>
					{periodSelectorOpen && (
						<PeriodSelectorModal
							enablePeriodSelector
							excludeRelativePeriods
							singleSelection
							selectedPeriods={compact([
								...(target.items?.map((item: any) => {
									if (item) {
										return item;
									}
								}) ?? [])
							])}
							onClose={() => setPeriodSelectorOpen(false)}
							hide={!periodSelectorOpen}
							onUpdate={(periods) => {
								setTarget((prevState: any) => {
									//Changed period[0]?.id to period[0]
									return {
										...prevState,
										items: [periods[0]]
									};
								});
								setPeriodSelectorOpen(false);
							}}
						/>
					)}
					<div className="row">
						<div className="column w-100 legend-settings-area">
							<LegendsField
								highIsGood={highIsGood}
								legendDefinitions={legendDefinitions}
								value={target.legends}
								onChange={(legends: any) => {
									setTarget((prevState: any) => {
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


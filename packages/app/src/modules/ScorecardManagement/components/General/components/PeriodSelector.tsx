import { useController, useWatch } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { Button, Field } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { PeriodTypeCategory, PeriodUtility } from "@hisptz/dhis2-utils";
import { isEmpty, uniqBy } from "lodash";
import { useBoolean } from "usehooks-ts";
import { PeriodSelectorModal } from "@hisptz/dhis2-ui";
import { useMemo } from "react";


export function PeriodSelector() {
	const periodTypeId = useWatch<ScorecardConfig>({
		name: "periodSelection.type"
	});

	const { field, fieldState } = useController<ScorecardConfig>({
		name: "periodSelection.periods"
	});
	const { value: hide, setTrue: onHide, setFalse: onShow } = useBoolean(true);

	const selectedPeriods = (field.value as Array<{ id: string }> ?? []).map(({ id: periodId }) => {
		return PeriodUtility.getPeriodById(periodId.toString());
	});
	const selectedPeriodIds = selectedPeriods.map((period) => period.id);
	const selectedPeriodNames = selectedPeriods.map((period) => period.name);
	const onUpdate = (periods: string[]) => {
		onHide();
		field.onChange(periods.map((period) => ({ id: period })));
	};
	const buttonLabel = !isEmpty(selectedPeriods) ? i18n.t("Change") : i18n.t("Select");

	const filteredPeriodTypes = useMemo(() => {
		if (!periodTypeId) {
			return [];
		}
		return uniqBy([
			...new PeriodUtility().setCategory(PeriodTypeCategory.FIXED).periodTypes,
			...new PeriodUtility().setCategory(PeriodTypeCategory.RELATIVE).periodTypes
		], "id").filter((periodType) => periodType.id != periodTypeId).map((periodType) => periodType.id);
	}, [periodTypeId]);

	return (
		<>
			{!hide && (<PeriodSelectorModal
				title={i18n.t("Select default period(s)")}
				enablePeriodSelector
				excludedPeriodTypes={filteredPeriodTypes}
				selectedPeriods={selectedPeriodIds}
				position="middle"
				onClose={onHide}
				hide={hide}
				onUpdate={onUpdate}
			/>)}
			<Field label={i18n.t("Default period")}
				   validationText={fieldState.error?.message} error={!!fieldState.error} name="periods" helpText={!isEmpty(selectedPeriods) ? `${i18n.t("Selected")}: ${selectedPeriodNames.join(", ")}` : ""}>
				<Button onClick={onShow}>{i18n.t("{{buttonLabel}} default period", { buttonLabel })}</Button>
			</Field>
		</>
	);
}

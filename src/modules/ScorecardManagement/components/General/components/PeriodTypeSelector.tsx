import i18n from "@dhis2/d2-i18n";
import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { PeriodTypeCategory, PeriodUtility } from "@hisptz/dhis2-utils";
import { useEffect, useMemo } from "react";
import { useController } from "react-hook-form";
import classes from "../styles/PeriodTypeSelector.module.css";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";

export function PeriodTypeSelector() {
	const { field, fieldState } = useController<ScorecardConfig, "periodSelection.type">({
		name: "periodSelection.type"
	});
	const fixedPeriodTypes = useMemo(
		() =>
			new PeriodUtility().setCategory(PeriodTypeCategory.FIXED)
				.periodTypes,
		[]
	);
	const relativePeriodTypes = useMemo(
		() =>
			new PeriodUtility().setCategory(PeriodTypeCategory.RELATIVE)
				.periodTypes,
		[]
	);

	useEffect(() => {
		if (field.value) {
			const value = [...relativePeriodTypes, ...fixedPeriodTypes].find(
				(type) => type.id === field.value
			);
			if (!value) {
				//This is an invalid value. Clear it
				field.onChange(undefined);
			}
		}
	}, []);

	const selected = useMemo(() => {
		if (field.value) {
			const value = [...relativePeriodTypes, ...fixedPeriodTypes].find(
				(type) => type.id === field.value?.toUpperCase()
			);
			if (!value) {
				return undefined;
			} else {
				return field.value.toUpperCase() as string | undefined;
			}
		}
		return field.value as string | undefined;
	}, [field.value]);

	return (
		<SingleSelectField
			{...field}
			className="period-type-settings"
			label={i18n.t("Allowed period type")}
			clearable
			filterable
			selected={selected}
			onChange={({ selected }: any) => field.onChange(selected)}
			validationText={fieldState.error?.message}
			error={!!fieldState.error}
			helpText={i18n.t(
				"The period selector will only show periods of this type"
			)}
		>
			<SingleSelectOption
				value={"disabled"}
				disabled
				className={classes["select-header"]}
				label={i18n.t("Fixed Periods")}
			/>
			{fixedPeriodTypes?.map((periodType) => {
				return (
					<SingleSelectOption
						key={periodType.id}
						value={periodType.id}
						label={periodType.config.name}
					/>
				);
			})}
			<SingleSelectOption
				value="disabled"
				disabled
				className={classes["select-header"]}
				label={i18n.t("Relative Periods")}
			/>
			{relativePeriodTypes?.map((periodType) => {
				return (
					<SingleSelectOption
						key={periodType.id}
						value={periodType.id}
						label={periodType.config.name}
					/>
				);
			})}
		</SingleSelectField>
	);
}

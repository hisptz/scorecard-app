import { DHIS2FormField } from "@hisptz/dhis2-ui";
import { set } from "lodash";
import React from "react";
import { LegendDefinition, ScorecardLegend } from "@hisptz/dhis2-scorecard";

function autoSetAdjacentValues(data: { startValue: number; endValue: number }[], index: number, highIsGood: boolean) {
	const newData = [...data];
	const updatedValue = newData[index];
	const previousValueIndex = highIsGood ? index - 1 : index + 1;
	const nextValueIndex = highIsGood ? index + 1 : index - 1;

	if (previousValueIndex >= 0) {
		set(
			newData,
			`${previousValueIndex}.startValue`,
			updatedValue?.endValue
		);
	}
	if (nextValueIndex < newData.length) {
		set(newData, `${nextValueIndex}.endValue`, updatedValue?.startValue);
	}
	return newData;
}

function editAtIndex(index: number, value: number, { data, highIsGood }: { data: { startValue: number; endValue: number }[], highIsGood: boolean }) {
	const newData = [...data];
	set(newData, index, value);
	return autoSetAdjacentValues(newData, index, highIsGood);
}

export default function LegendsField({ value, onChange, legendDefinitions, highIsGood }: { value: ScorecardLegend[], onChange: (legends: ScorecardLegend[]) => void; legendDefinitions: LegendDefinition[]; highIsGood: boolean }) {
	return (
		<DHIS2FormField
			value={value}
			legendDefinitions={legendDefinitions}
			highIsGood={highIsGood}
			valueType="LEGEND_MIN_MAX_GROUP"
			name="legend-min-max-group"
			onChange={onChange}
		/>
	);
}
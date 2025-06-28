import PropTypes from "prop-types";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { getNonDefaultLegendDefinitions } from "../../../../../../../General/utils/utils";
import LevelTargetsField from "../TargetsArea/components/LevelTargetsField";
import {
	DHIS2ValueTypes,
	FormFieldModel,
} from "../../../../../../../../../../shared";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";

export default function OrgUnitLevelSpecificTargets({
	path,
}: {
	path: string;
}) {
	const { getValues } = useFormContext<ScorecardConfig>();
	const { field } = useController({
		name: path,
	});
	const legendDefinitions = getNonDefaultLegendDefinitions(
		getValues("legendDefinitions")
	);
	const weight = field.value?.weight ?? 100;
	const highIsGood = field.value?.highIsGood ?? true;
	const defaultLegends = field.value?.legends ?? [];

	return (
		<LevelTargetsField
			multipleFields={legendDefinitions?.map(
				(legend: any) =>
					new FormFieldModel({
						id: legend.id,
						mandatory: false,
						name: legend.name,
						legendDefinition: legend,
						valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name,
					})
			)}
			value={defaultLegends}
			onChange={({ value }: any) => {
				field.onChange({
					...field.value,
					legends: value,
				});
			}}
			highIsGood={highIsGood}
			weight={weight}
			path={path}
			name={"legends"}
		/>
	);
}
OrgUnitLevelSpecificTargets.propTypes = {
	path: PropTypes.string.isRequired,
};

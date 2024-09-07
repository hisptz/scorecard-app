import { RHFDHIS2FormField } from "@hisptz/dhis2-ui";
import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";

export default function TargetsField(props: any) {
	const { name, path } = props ?? {};
	const [legendDefinitions, highIsGood] = useWatch({
		name: [`legendDefinitions`, `${path}.highIsGood`],
	});
	const nonDefaultLegendDefinitions = useMemo(
		() =>
			legendDefinitions.filter(
				(legendDefinition: any) => !legendDefinition.isDefault,
			),
		[legendDefinitions],
	);

	return (
		<RHFDHIS2FormField
			name={name}
			valueType={"LEGEND_MIN_MAX_GROUP"}
			highIsGood={!highIsGood}
			legendDefinitions={nonDefaultLegendDefinitions}
		/>
	);
}

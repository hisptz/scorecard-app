import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { ScorecardOptions } from "../../../../../shared";

export default function useOptionsManage() {
	const { watch, setValue } = useFormContext();

	const scorecardOptions = watch("options");

	const setScorecardOptions = useCallback(
		(updatedOptions: any) => {
			setValue("options", updatedOptions);
		},
		[setValue],
	);

	const onChange = (key: any) => (newValue: any) => {
		setScorecardOptions(
			ScorecardOptions.set(
				scorecardOptions,
				key,
				newValue?.checked ?? newValue,
			),
		);
	};

	const onAverageChange = (value: any) => {
		setScorecardOptions(
			ScorecardOptions.set(scorecardOptions, "averageDisplayType", value),
		);
	};

	return {
		onAverageChange,
		onChange,
		scorecardOptions,
	};
}

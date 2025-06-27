import { getHoldersFromGroups, GROUPS_CONFIG_HELP_STEPS, INDICATOR_CONFIGURATION_STEPS, INDICATOR_SETUP_HELP_STEPS, INTRODUCTION_HELP_STEPS, NO_GROUPS_HELP_STEPS, NO_INDICATORS_HELP_STEPS, PREVIEW_TABLE_HELP_STEPS, ScorecardConfigEditState } from "../../../../../shared";
import { isEmpty, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function useHelp(groups: any) {
	const [helpSteps, setHelpSteps] = useState(INTRODUCTION_HELP_STEPS);
	const { selectedDataHolderIndex }: any = useRecoilValue(
		ScorecardConfigEditState
	);
	useEffect(() => {
		setHelpSteps((prevSteps: any) => {
			let steps = [...prevSteps];
			if (!isEmpty(groups)) {
				steps = [
					...INTRODUCTION_HELP_STEPS,
					...GROUPS_CONFIG_HELP_STEPS,
					...PREVIEW_TABLE_HELP_STEPS
				];
			}
			if (isEmpty(groups)) {
				steps = [...INTRODUCTION_HELP_STEPS, ...NO_GROUPS_HELP_STEPS];
			}
			if (!isEmpty(groups) && isEmpty(getHoldersFromGroups(groups))) {
				steps = [...steps, ...NO_INDICATORS_HELP_STEPS];
			}

			if (!isEmpty(getHoldersFromGroups(groups))) {
				steps = [...steps, ...INDICATOR_SETUP_HELP_STEPS];
			}
			if (!isNaN(selectedDataHolderIndex)) {
				steps = [...steps, ...INDICATOR_CONFIGURATION_STEPS];
			}
			return uniqBy(steps, "element");
		});
	}, [groups, selectedDataHolderIndex]);

	return helpSteps;
}

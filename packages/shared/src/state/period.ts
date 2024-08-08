import { isEmpty } from "lodash";
import { selector } from "recoil";
import { ScorecardViewState } from "./scorecard";

const PeriodResolverState = selector({
	key: "period-resolver",
	get: ({ get }) => {
		const { periods } = get(ScorecardViewState("periodSelection")) ?? {};

		if (!isEmpty(periods)) {
			return [];
		}
		return [];
	},
});

export { PeriodResolverState };

import { Period } from "@iapps/period-utilities";
import {
  compact,
  differenceBy,
  filter,
  isArray,
  isEmpty,
  uniqBy,
} from "lodash";
import { atom, selector } from "recoil";
import { ScorecardViewState } from "../../../../../../../../../core/state/scorecard";

const PeriodState = atom({
  key: "cell-analysis-period-state",
  default: selector({
    key: "cell-analysis-period-selector",
    get: ({ get }) => {
      return get(ScorecardViewState("periodSelection"));
    },
  }),
});

const ResolvedPeriodState = selector({
  key: "cell-analysis-period-resolver",
  get: ({ get }) => {
    const { periods } = get(PeriodState) ?? {};
    if (!isEmpty(periods)) {
      const relativePeriods = filter(periods, ({ id }) => {
        const period = new Period().setPreferences({ allowFuturePeriods: true }).getById(id);
        return period?.type?.match(RegExp("Relative"));
      });
      let allPeriods = [...differenceBy(periods, relativePeriods, "id")];
      for (const period of relativePeriods) {
        const periodInstance = new Period().setPreferences({ allowFuturePeriods: true }).getById(period?.id);
        const actualPeriods = isArray(periodInstance?.iso)
          ? periodInstance?.iso
          : [periodInstance?.iso];
        allPeriods = allPeriods.concat(actualPeriods);
      }
      return uniqBy(compact(allPeriods), "id");
    }
    return [];
  },
});

export { PeriodState, ResolvedPeriodState };

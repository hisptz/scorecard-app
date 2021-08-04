import {Period} from "@iapps/period-utilities";
import {compact, differenceBy, filter, isArray, isEmpty, uniqBy} from 'lodash'
import {selector} from 'recoil'
import {ScorecardViewSelector} from "./scorecard";

const PeriodResolverState = selector({
    key: 'period-resolver',
    get: ({get}) => {
        const {periods} = get(ScorecardViewSelector('periodSelection'))
        if (!isEmpty(periods)) {
            const relativePeriods = filter(periods, ({id}) => {
                const period = new Period().getById(id)
                return period?.type?.match(RegExp('Relative'))
            })
            let allPeriods = [
                ...differenceBy(periods, relativePeriods, 'id')
            ]
            for (const period of relativePeriods) {
                const periodInstance = new Period().getById(period?.id)
                const actualPeriods = isArray(periodInstance?.iso) ? periodInstance?.iso : [periodInstance?.iso];
                allPeriods = allPeriods.concat(actualPeriods)
            }
            return uniqBy(compact(allPeriods), 'id');
        }
        return []
    }
})


export {
    PeriodResolverState
}

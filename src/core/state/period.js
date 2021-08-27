import {Period} from "@iapps/period-utilities";
import {compact, differenceBy, filter, isArray, isEmpty, uniqBy} from 'lodash'
import {selector} from 'recoil'
import {ScorecardViewState} from "./scorecard";
import {SystemSettingsState} from "./system";

const PeriodResolverState = selector({
    key: 'period-resolver',
    get: ({get}) => {
        const {periods} = get(ScorecardViewState('periodSelection')) ?? {}
        const {calendar} = get(SystemSettingsState) ?? {calendar: 'gregorian'}


        if (!isEmpty(periods)) {
            const relativePeriods = filter(periods, ({id}) => {
                const period = new Period().setCalendar(calendar).getById(id)
                return period?.type?.match(RegExp('Relative'))
            })
            let allPeriods = [
                ...differenceBy(periods, relativePeriods, 'id')
            ]
            for (const period of relativePeriods) {
                const periodInstance = new Period().setCalendar(calendar).getById(period?.id)
                console.log(periodInstance)
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

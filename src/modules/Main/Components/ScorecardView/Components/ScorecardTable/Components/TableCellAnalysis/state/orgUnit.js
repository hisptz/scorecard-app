import {atom, selector} from "recoil";
import {ScorecardViewState} from "../../../../../../../../../core/state/scorecard";


const OrgUnitState = atom({
    key: 'cell-analysis-orgUnit-state',
    default: selector({
        key: 'cell-analysis-orgUnit-selector',
        get: ({get}) => {
            return get(ScorecardViewState('orgUnitSelection'))
        }
    })
})

export {
    OrgUnitState
}

import {cloneDeep, get as _get, set as _set} from 'lodash'
import {atom, selectorFamily} from "recoil";

const defaultValue = {
    dataSourceGroups: [],
    legendDefinitions:[
        {
            color: "#417505",
            name: 'Target Reached'
        },
        {
            color: "#f8e71c",
            name: "Average"
        },
        {
            color: "#d0021b",
            name: "Poor Performance"
        }
    ]
}

const ScorecardState = atom({
    key: 'active-scorecard',
    default: defaultValue
})

const ScorecardStateSelector = selectorFamily({
    key: 'scorecard-state-selector',
    get: path => ({get}) => _get(get(ScorecardState), path),
    set: path => ({set}, newValue) => set(ScorecardState, prevState => _set(cloneDeep(prevState), path, newValue))
})

const ScorecardEditState = atom({
    key: 'scorecard-edit-state',
    default: {}
})

export default ScorecardState;
export {ScorecardEditState, ScorecardStateSelector}

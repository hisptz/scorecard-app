import {cloneDeep, get as _get, set as _set} from 'lodash'
import {atom, selectorFamily} from "recoil";

const defaultValue = {
    dataSourceGroups: []
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

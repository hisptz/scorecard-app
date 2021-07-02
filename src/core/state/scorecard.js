import {cloneDeep, get as _get, set as _set} from 'lodash'
import {atom, selectorFamily} from "recoil";
import ScorecardAccessType from "../constants/scorecardAccessType";
import OrgUnitSelection from "../models/orgUnitSelection";
import Scorecard from "../models/scorecard";
import ScorecardAccess from "../models/scorecardAccess";
import ScorecardOptions from "../models/scorecardOptions";

const defaultValue = {
    legendDefinitions: [
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
    ],
    scorecardOptions: new ScorecardOptions(),
    publicAccess: new ScorecardAccess({
        id: 'public',
        type: 'public',
        access: ScorecardAccessType.NO_ACCESS,
        displayName: 'Public'
    }),
    orgUnitSelection: new OrgUnitSelection(),
    userGroupAccesses: [],
    userAccesses: [],
    highlightedIndicators: []
}

const ScorecardState = atom({
    key: 'active-scorecard',
    default: new Scorecard(defaultValue)
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

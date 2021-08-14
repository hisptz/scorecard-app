import {Period} from "@iapps/period-utilities";
import {cloneDeep, get as _get, isEmpty, set as _set} from "lodash";
import {atom, atomFamily, selector, selectorFamily} from "recoil";
import getScorecard from "../../shared/services/getScorecard";
import getScorecardSummary from "../../shared/services/getScorecardSummary";
import ScorecardAccessType from "../constants/scorecardAccessType";
import OrgUnitSelection from "../models/orgUnitSelection";
import Scorecard from "../models/scorecard";
import ScorecardAccess from "../models/scorecardAccess";
import ScorecardDataEngine from "../models/scorecardData";
import ScorecardOptions from "../models/scorecardOptions";
import {EngineState} from "./engine";

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

const scorecardDataEngine = new ScorecardDataEngine()

const ScorecardIdState = atom({
    key: 'scorecard-id',
    default: null
})

const ScorecardSummaryState = atom({
    key: 'scorecard-summary',
    default: selector({
        key: 'scorecard-summary-selector',
        get: async ({get}) => {
            const engine = get(EngineState);
            const {summary, error} = await getScorecardSummary(engine)
            if (error) throw error;
            return summary;
        },
    })
})
//This is to force a data re-fetch when a scorecard is updated
const ScorecardRequestId = atomFamily({
    key: 'scorecardForceUpdateState',
    default: 0
})

const ScorecardConfState = atomFamily({
    key: 'scorecard-config',
    default: selectorFamily({
        key: 'active-scorecard-config',
        get: (scorecardId) => async ({get}) => {
            const engine = get(EngineState)
            get(ScorecardRequestId(scorecardId))
            if (scorecardId) {
                const {scorecard, error} = await getScorecard(scorecardId, engine)
                if (error) throw error;
                return scorecard
            }
            return new Scorecard(defaultValue)
        }
    })
})


const ScorecardConfigDirtyState = atomFamily({
    key: 'scorecard-config-edit-state',
    default: selectorFamily({
        key: 'scorecard-state-default',
        get: path => ({get}) => {
            const scorecardId = get(ScorecardIdState)
            if (!isEmpty(scorecardId)) return _get(get(ScorecardConfState(scorecardId)), path)
            return _get(new Scorecard(defaultValue), path)
        },
    }),
})

const ScorecardConfigDirtySelector = selectorFamily({
    key: 'scorecard-dirty-state-selector',
    get: ({key, path}) => ({get}) => {
        return _get(get(ScorecardConfigDirtyState(key)), path)
    },
    set: ({key, path}) => ({get, set}, newValue) => {

        const object = get(ScorecardConfigDirtyState(key))
        const newObject = _set(cloneDeep(object), path, newValue)
        set(ScorecardConfigDirtyState(key), newObject)
    }
})

const ScorecardConfigErrorState = atom({
    key: 'scorecard-config-error-state',
    default: {}
})

const ScorecardConfigErrorSelector = selectorFamily({
    key: 'scorecard-config-error-selector',
    get: (path) => ({get}) => {
        return _get(get(ScorecardConfigErrorState), path)
    },
    set: (path) => ({set}, newValue) => {
        set(ScorecardConfigErrorState, prevValue => _set(prevValue, path, newValue))
    }
})


const ScorecardConfigEditState = atom({
    key: 'scorecard-edit-state',
    default: {}
})

const ScorecardViewState = atomFamily({
    key: 'scorecard-view-config',
    default: selectorFamily({
        key: 'scorecardViewStateSelector',
        get: (key) => ({get}) => {
            const scorecardId = get(ScorecardIdState)
            const configState = get(ScorecardConfState(scorecardId))
            if (key === 'periodSelection') {
                const {periodType} = configState;
                const currentPeriod = new Period()
                if (periodType) {
                    currentPeriod.setType(periodType)
                }
                return {
                    periods: currentPeriod?.get()?.list(),
                    periodType
                }
            }
            return configState[key];
        }
    })
})


export default ScorecardConfState;
export {
    ScorecardConfigEditState,
    ScorecardConfigDirtyState,
    ScorecardIdState,
    ScorecardSummaryState,
    ScorecardViewState,
    ScorecardRequestId,
    scorecardDataEngine,
    ScorecardConfigDirtySelector,
    ScorecardConfigErrorSelector,
    ScorecardConfigErrorState
}

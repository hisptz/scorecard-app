import {Period} from "@iapps/period-utilities";
import {cloneDeep, get as _get, set as _set} from "lodash";
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


const ScorecardConfigStateSelector = selectorFamily({
    key: 'scorecard-state-selector',
    get: path => ({get}) => {
        const scorecardId = get(ScorecardIdState)
        return _get(get(ScorecardConfState(scorecardId)), path)
    },
    set: path => ({set, get}, newValue) => {
        const scorecardId = get(ScorecardIdState)
        set(ScorecardConfState(scorecardId), prevState => _set(cloneDeep(prevState), path, newValue))
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
    ScorecardConfigStateSelector,
    ScorecardIdState,
    ScorecardSummaryState,
    ScorecardViewState,
    ScorecardRequestId,
    scorecardDataEngine,
}

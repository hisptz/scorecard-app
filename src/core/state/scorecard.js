import {Period} from "@iapps/period-utilities";
import {cloneDeep, get as _get, set as _set} from "lodash";
import {atom, selector, selectorFamily} from "recoil";
import getScorecard from "../../shared/services/getScorecard";
import getScorecardSummary from "../../shared/services/getScorecardSummary";
import ScorecardAccessType from "../constants/scorecardAccessType";
import OrgUnitSelection from "../models/orgUnitSelection";
import Scorecard from "../models/scorecard";
import ScorecardAccess from "../models/scorecardAccess";
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

const ScorecardConfState = atom({
    key: 'active-scorecard',
    default: selector({
        key: 'active-scorecard-default',
        get: async ({get}) => {
            const scorecardId = get(ScorecardIdState)
            const engine = get(EngineState)
            if (scorecardId) {
                const {scorecard, error} = await getScorecard(scorecardId, engine)
                if (error) throw error;
                console.log(scorecard)
                return scorecard
            }
            return new Scorecard(defaultValue)
        }
    }),
})

const ScorecardDataState = atom({
    key: 'scorecardDataState',
    default: selector({
        key: 'scorecardDataStateSelector',
        get: async ({get}) => {
            const {orgUnitSelection, periodSelection} = get(ScorecardViewState) //Current period and org unit selections
            const scorecardConfig = get(ScorecardConfState)
            //TODO: Implement the getScorecard data function and return the results from here @rajey

            //expected output format
            // return {
            //     'indicatorId-orgUnit-period': {
            //         previousValue: 45,
            //         currentValue: 12,
            //     }
            // }
            return {}
        }
    })
})


const ScorecardDataStateSelector = selectorFamily({
    key: 'scorecardDataStateSelectorFamily',
    get: (key) => ({get}) => {
        return _get(get(ScorecardDataState), key)
    }
})

const ScorecardConfigStateSelector = selectorFamily({
    key: 'scorecard-state-selector',
    get: path => ({get}) => _get(get(ScorecardConfState), path),
    set: path => ({set}, newValue) => set(ScorecardConfState, prevState => _set(cloneDeep(prevState), path, newValue))
})

const ScorecardConfigEditState = atom({
    key: 'scorecard-edit-state',
    default: {}
})

const ScorecardViewState = atom({
    key: 'scorecardViewState',
    default: selector({
        key: 'scorecardViewStateSelector',
        get: ({get}) => {
            const {orgUnitSelection, options, periodType} = get(ScorecardConfState) ?? {}
            console.log(options)
            const currentPeriod = new Period()
            if (periodType) currentPeriod.setType(periodType)
            return {
                orgUnitSelection,
                periodSelection: {
                    periods: currentPeriod?.get()?.list()
                },
                options
            }
        }
    })
})

const ScorecardViewSelector = selectorFamily({
    key: 'scorecardViewSelectorFamily',
    get: path => ({get}) => _get(get(ScorecardViewState), path),
    set: path => ({set}, newValue) => set(ScorecardViewState, prevState => _set(cloneDeep(prevState), path, newValue))
})

export default ScorecardConfState;
export {
    ScorecardConfigEditState,
    ScorecardConfigStateSelector,
    ScorecardIdState,
    ScorecardSummaryState,
    ScorecardViewState,
    ScorecardViewSelector,
    ScorecardDataState,
    ScorecardDataStateSelector
}

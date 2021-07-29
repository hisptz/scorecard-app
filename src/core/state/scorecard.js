import {Period} from "@iapps/period-utilities";
import {cloneDeep, flattenDeep, get as _get, set as _set} from "lodash";
import {atom, atomFamily, selector, selectorFamily} from "recoil";
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

const ScorecardSummaryState = selector({
    key: 'scorecard-summary-selector',
    get: async ({get}) => {
        const engine = get(EngineState);
        const {summary, error} = await getScorecardSummary(engine)
        if (error) throw error;
        return summary;
    },
})

const ScorecardForceUpdateState = atomFamily({
    key: 'scorecardForceUpdateState',
    default: 0
})

const ScorecardConfState = atomFamily({
    key: 'scorecard-config',
    default: selectorFamily({
        key: 'active-scorecard-config',
        get: (scorecardId) => async ({get}) => {
            const engine = get(EngineState)
            if (scorecardId) {

                const {scorecard, error} = await getScorecard(scorecardId, engine)

                if (error) throw error;
                return scorecard
            }
            return new Scorecard(defaultValue)
        }
    })
})

const ScorecardDataState = selector({
    key: 'scorecardDataStateDefault',
    get: async ({get}) => {
        const orgUnits = get(ScorecardViewSelector('orgUnitSelection'))?.orgUnits?.map(({id}) => id)
        const periods = get(ScorecardViewSelector('periodSelection'))?.periods.map(({id}) => id)
        const dataGroups = get(ScorecardConfigStateSelector('dataSelection'))?.dataGroups
        const indicators = flattenDeep(flattenDeep(dataGroups.map(({dataHolders}) => dataHolders))?.map(({dataSources}) => dataSources))
        console.log({orgUnits, periods, dataGroups, indicators})

    }
})

const ScorecardDataStateSelector = selectorFamily({
    key: 'scorecardDataStateSelectorFamily',
    get: (key) => ({get}) => {
        return _get(get(ScorecardDataState), key)
    }
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

const ScorecardViewState = atom({
    key: 'scorecard-view-config',
    default: selector({
        key: 'scorecardViewStateSelector',
        get: ({get}) => {
            const scorecardId = get(ScorecardIdState)
            const {orgUnitSelection, options, periodType} = get(ScorecardConfState(scorecardId)) ?? {}
            const currentPeriod = new Period()

            if (periodType) {
                currentPeriod.setType(periodType)
            }
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
    ScorecardDataStateSelector,
    ScorecardForceUpdateState
}

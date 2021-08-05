import {Period} from "@iapps/period-utilities";
import {cloneDeep, find, flattenDeep, get as _get, set as _set, zipObjectDeep} from "lodash";
import {atom, atomFamily, selector, selectorFamily} from "recoil";
import getScorecard from "../../shared/services/getScorecard";
import getScorecardCellData from "../../shared/services/getScorecardCellData";
import getScorecardSummary from "../../shared/services/getScorecardSummary";
import ScorecardAccessType from "../constants/scorecardAccessType";
import OrgUnitSelection from "../models/orgUnitSelection";
import Scorecard from "../models/scorecard";
import ScorecardAccess from "../models/scorecardAccess";
import ScorecardDataEngine from "../models/scorecardData";
import ScorecardOptions from "../models/scorecardOptions";
import {EngineState} from "./engine";
import {PeriodResolverState} from "./period";

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


const ScorecardDataState = selectorFamily({
    key: 'scorecard-data-state',
    get: (orgUnitId) => async ({get}) => {
        const periods = get(PeriodResolverState)
        const {dataGroups} = get(ScorecardConfigStateSelector('dataSelection'))
        const dataSources = flattenDeep(flattenDeep(dataGroups.map(({dataHolders}) => dataHolders))?.map(({dataSources}) => dataSources))?.map(({id}) => id)
        const {_data: analytics} = await getScorecardCellData({
            orgUnit: orgUnitId,
            periods: periods.map(({id}) => id),
            dataSources
        })
        if (analytics) {
            const rows = analytics?.rows;
            return rows?.map((row) =>
                zipObjectDeep(analytics?.headers
                    ?.map(({name}) => name), row))
        }
    }
})

const ScorecardDataStateSelector = selectorFamily({
    key: 'scorecardDataStateSelectorFamily',
    get: ({orgUnit, period, dataSource}) => ({get}) => {
        if (dataSource !== 'undefined') {
            const currentData = find(get(ScorecardDataState(orgUnit)), ({
                                                                            dx,
                                                                            pe,
                                                                            ou
                                                                        }) => {
                return ou === orgUnit && dx === dataSource && pe === period
            })
            const previousData = find(get(ScorecardDataState(orgUnit)), ({
                                                                             dx,
                                                                             pe,
                                                                             ou
                                                                         }) => {
                const previousPeriod = new Period().getById(period).lastPeriod;
                return ou === orgUnit && dx === dataSource && pe === previousPeriod?.id
            })

            return {
                current: _get(currentData, ['value']),
                previous: _get(previousData, ['value'])
            }
        }
        return null
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
    ScorecardDataState,
    ScorecardDataStateSelector,
    ScorecardForceUpdateState,
    scorecardDataEngine,
}

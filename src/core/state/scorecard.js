import {Period} from "@iapps/period-utilities";
import {cloneDeep, filter, flatten, get as _get, head, isEmpty, set as _set} from "lodash";
import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {
    getColSpanDataGroups, getColSpanWithOrgUnit,
    getTableWidthWithDataGroups,
    getTableWidthWithOrgUnit
} from "../../modules/Main/Components/ScorecardView/Components/ScorecardTable/services/utils";
import {searchOrganisationUnit} from "../../shared/hooks/useOrganisationUnits";
import getScorecard from "../../shared/services/getScorecard";
import getScorecardSummary from "../../shared/services/getScorecardSummary";
import {getHoldersFromGroups} from "../../shared/utils/utils";
import {Orientation} from "../constants/orientation";
import ScorecardAccessType from "../constants/scorecardAccessType";
import {TableSort} from "../constants/tableSort";
import OrgUnitSelection from "../models/orgUnitSelection";
import Scorecard from "../models/scorecard";
import ScorecardAccess from "../models/scorecardAccess";
import ScorecardDataEngine from "../models/scorecardData";
import ScorecardOptions from "../models/scorecardOptions";
import {EngineState} from "./engine";
import {OrgUnitChildren} from "./orgUnit";
import {PeriodResolverState} from "./period";
import {
    sortDataSourcesBasedOnData,
    sortDataSourcesBasedOnNames,
    sortOrgUnitsBasedOnData,
    sortOrgUnitsBasedOnNames
} from "./utils";

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
            if (key === 'tableSort') {
                return {
                    orgUnit: TableSort.DEFAULT,
                    data: TableSort.DEFAULT
                }
            }
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

const ScorecardTableSortState = atom({
    key: 'scorecard-table-state',
    default: {}
})

const ScorecardTableOrientationState = atom({
    key: 'scorecard-table-orientation-state',
    default: 'orgUnitsVsData'
})

const ScorecardTableConfigState = selectorFamily({
    key: 'scorecard-table-details',
    get: (orgUnits) => ({get}) => {
        const orientation = get(ScorecardTableOrientationState)
        const periods = get(PeriodResolverState)
        const {dataGroups} = get(ScorecardViewState('dataSelection'))
        const {averageColumn} = get(ScorecardViewState('options'))
        const {filteredOrgUnits, childrenOrgUnits} = get(ScorecardOrgUnitState(orgUnits))

        return orientation === 'orgUnitsVsData' ? {
            rows: 'orgUnits',
            columns: [
                'groups',
                'data',
                'periods'
            ],
            tableWidth: getTableWidthWithDataGroups(periods, dataGroups, averageColumn),
            colSpan: getColSpanDataGroups(periods, dataGroups, averageColumn)
        } : {
            rows: 'data',
            columns: [
                'orgUnits',
                'periods'
            ],
            tableWidth: getTableWidthWithOrgUnit(periods, [...filteredOrgUnits, ...childrenOrgUnits], averageColumn),
            colSpan: getColSpanWithOrgUnit(periods, [...filteredOrgUnits, ...childrenOrgUnits], averageColumn)
        }
    }
})

const ScorecardOrgUnitState = selectorFamily({
    key: 'selected-org-unit-state',
    get: (orgUnits) => async ({get}) => {
        const engine = get(EngineState)
        const searchKeyword = get(ScorecardViewState("orgUnitSearchKeyword"))
        const {orgUnit: sort} = get(ScorecardViewState('tableSort'))
        const dataSort = get(ScorecardTableSortState)
        const periods = get(PeriodResolverState)
        const orientation = get(ScorecardTableOrientationState)

        let orgUnitSort = []
        if (dataSort) {
            if (orientation === Orientation.ORG_UNIT_VS_DATA) {
                if (dataSort.type === 'period') {
                    const [dx, pe] = dataSort.name?.split('-');
                    console.log('this?')
                    scorecardDataEngine.sortOrgUnitsByDataAndPeriod({
                        dataSource: dx,
                        period: pe,
                        sortType: dataSort?.direction
                    }).subscribe((ouSort) => orgUnitSort = ouSort)
                }
                if (dataSort.type === 'data') {
                    const dx = dataSort?.name;
                    scorecardDataEngine.sortOrgUnitsByData({
                        dataSource: dx,
                        periods: periods?.map(({id}) => id),
                        sortType: dataSort?.direction
                    }).subscribe(ouSort => orgUnitSort = ouSort)
                }
            }
        }

        let childrenOrgUnits = [];

        if (orgUnits.length === 1) {
            childrenOrgUnits = get(OrgUnitChildren(head(orgUnits)?.id))
        }

        let filteredOrgUnits = orgUnits;


        if (!isEmpty(searchKeyword)) {
            filteredOrgUnits = await searchOrganisationUnit(searchKeyword, engine);
        }

        if (!isEmpty(orgUnitSort)) {
            const {parentOrgUnits, childOrgUnits} = sortOrgUnitsBasedOnData({
                orgUnitSort,
                childrenOrgUnits,
                filteredOrgUnits
            })
            filteredOrgUnits = parentOrgUnits
            childrenOrgUnits = childOrgUnits

        } else {
            const {parentOrgUnits, childOrgUnits} = sortOrgUnitsBasedOnNames({sort, childrenOrgUnits, filteredOrgUnits})
            filteredOrgUnits = parentOrgUnits
            childrenOrgUnits = childOrgUnits
        }

        return {
            childrenOrgUnits,
            filteredOrgUnits,
            orgUnitsCount: (childrenOrgUnits?.length + filteredOrgUnits?.length)
        }
    }
})

const ScorecardDataSourceState = selector({
    key: 'data-source-state',
    get: ({get}) => {
        const {dataGroups} = get(ScorecardViewState("dataSelection")) ?? {};
        const dataSearchKeyword = get(ScorecardViewState('dataSearchKeyword'))
        const {data: sort} = get(ScorecardViewState('tableSort'))
        const dataHolders = getHoldersFromGroups(dataGroups)
        const dataSort = get(ScorecardTableSortState)
        const periods = get(PeriodResolverState)
        const orientation = get(ScorecardTableOrientationState)
        let filteredResult = dataHolders;
        if (!isEmpty(dataSearchKeyword)) {
            filteredResult = filter(dataHolders, (value) => {
                const searchIndex = flatten(value.dataSources?.map(({
                                                                        id,
                                                                        displayName
                                                                    }) => (`${id}-${displayName}`))).join('_')
                return searchIndex.toLowerCase().match(RegExp(dataSearchKeyword.toLowerCase()))
            })
        }
        let dataSourceSort = []
        if (!isEmpty(dataSort)) {
            if (orientation === Orientation.DATA_VS_ORG_UNIT) {
                if (dataSort.type === 'orgUnit') {
                    scorecardDataEngine.sortDataSourceByOrgUnit({
                        periods: periods?.map(({id}) => id),
                        orgUnit: dataSort?.name,
                        sortType: dataSort?.direction
                    }).subscribe(dSort => dataSourceSort = dSort)
                }
                if (dataSort.type === 'period') {
                    const [ou, pe] = dataSort.name.split('-')
                    console.log({ou, pe})
                    scorecardDataEngine.sortDataSourceByOrgUnitAndPeriod({
                        period: pe,
                        orgUnit: ou,
                        sortType: dataSort?.direction
                    }).subscribe(dSort => dataSourceSort = dSort)
                }
            }
        }

        if (!isEmpty(dataSourceSort)) {
            filteredResult = sortDataSourcesBasedOnData({dataSort: dataSourceSort, dataSources: filteredResult})
        } else {
            filteredResult = sortDataSourcesBasedOnNames({sort, dataSources: filteredResult})
        }

        return filteredResult;
    }
})

const ScorecardDataLoadingState = atom({
    key: 'data-loading-state',
    default: true,
    effects_UNSTABLE: [
        ({trigger, setSelf, onSet}) => {

            onSet(()=>setSelf(true))

            if (trigger === 'get') {
                setSelf(true)
                const subscription = scorecardDataEngine.loading$.subscribe(setSelf)
                return () => subscription.unsubscribe();
            }
        }
    ]
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
    ScorecardConfigErrorState,
    ScorecardTableOrientationState,
    ScorecardTableConfigState,
    ScorecardOrgUnitState,
    ScorecardTableSortState,
    ScorecardDataSourceState,
    ScorecardDataLoadingState
}

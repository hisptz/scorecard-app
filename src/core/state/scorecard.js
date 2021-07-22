import { useDataEngine } from "@dhis2/app-runtime";
import { cloneDeep, get as _get, set as _set } from "lodash";
import { atom, selector, selectorFamily } from "recoil";
import getScorecard from "../../shared/services/getScorecard";
import getScorecardData from "../../shared/services/getScorecardData";
import getScorecardSummary from "../../shared/services/getScorecardSummary";
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

const ScorecardIdState = atom({
    key: 'scorecard-id',
})

const ScorecardSummaryState = atom({
    key: 'scorecard-summary',
    default: selector({
        key: 'scorecard-summary-selector',
        get: async () => {
            const engine = useDataEngine();
            const {summary, error} = await getScorecardSummary(engine)
            if (error) throw error;
            return summary;
        },
    })
})

const ScorecardState = atom({
    key: 'active-scorecard',
    default: selector({
        key: 'active-scorecard-default',
        get: async ({get}) => {
            const scorecardId = get(ScorecardIdState)
            const engine = useDataEngine();
            if (scorecardId) {
                const {scorecard, error} = await getScorecard(scorecardId, engine)
                if (error) throw error;
                return scorecard
            }
            return new Scorecard(defaultValue)
        }
    }),
    effects_UNSTABLE: [
        ({trigger, resetSelf}) => {
            if (trigger === 'get') {
                resetSelf()
            }
        }
    ]
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

const ScorecardViewState = atom({
    key: 'scorecardViewState',
    default: selector({
        key: 'scorecardViewStateSelector',
        get: ({get}) => {
            const {orgUnitSelection, periodSelection, options} = get(ScorecardState) ?? {}
            return {
                orgUnitSelection,
                periodSelection,
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

export default ScorecardState;
export {
    ScorecardEditState,
    ScorecardStateSelector,
    ScorecardIdState,
    ScorecardSummaryState,
    ScorecardViewState,
    ScorecardViewSelector
}

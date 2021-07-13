import {useDataMutation} from "@dhis2/app-runtime";
import {cloneDeep, findIndex} from 'lodash'
import {useState} from "react";
import {useRecoilState} from "recoil";
import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_KEY} from "../../../core/constants/config";
import {ScorecardSummaryState} from "../../../core/state/scorecard";


const updateMutation = {
    type: 'update',
    resource: DATASTORE_ENDPOINT,
    id: DATASTORE_SCORECARD_SUMMARY_KEY,
    data: ({data}) => data,
}


export default function useScorecardsSummary() {
    const [executionError, setExecutionError] = useState();
    const [summary, setSummary] = useRecoilState(ScorecardSummaryState)
    const [update, {error: updateError, loading: updateLoading}] = useDataMutation(updateMutation)

    const addSingleScorecardSummary = async (updatedSummary) => {
        try {
            const updatedList = cloneDeep(summary) ?? [];
            updatedList.push(updatedSummary)
            await update({
                data: updatedList
            })
            setSummary(() => updatedList)
        } catch (e) {
            setExecutionError(e)
        }
    }
    const updateSingleScorecardSummary = async (id, updatedSummary) => {
        try {
            const updatedList = cloneDeep(summary) ?? [];
            updatedList.splice(findIndex(updatedList, ['id', id]), 1, updatedSummary)
            await update({
                data: updatedList
            })
            setSummary(() => updatedList)
        } catch (e) {
            setExecutionError(e)
        }
    }
    const removeSingleScorecardSummary = async (id) => {
        try {
            const updatedList = cloneDeep(summary) ?? [];
            updatedList.splice(findIndex(updatedList, ['id', id]), 1)
            await update({
                data: updatedList
            })
            setSummary(() => updatedList)
        } catch (e) {
            setExecutionError(e)
        }
    }

    return {
        summary,
        error: executionError ?? updateError,
        loading: updateLoading,
        updateSingleScorecardSummary,
        removeSingleScorecardSummary,
        addSingleScorecardSummary
    }
}

import {useDataMutation, useDataQuery} from "@dhis2/app-runtime";
import {cloneDeep, findIndex} from 'lodash'
import {useState} from "react";
import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_KEY} from "../../../core/constants/config";

const query = {
    summary: {
        resource: DATASTORE_ENDPOINT,
        id: DATASTORE_SCORECARD_SUMMARY_KEY
    }
}

const updateMutation = {
    type: 'update',
    resource: DATASTORE_ENDPOINT,
    id: DATASTORE_SCORECARD_SUMMARY_KEY,
    data: ({data}) => data,
}


export default function useScorecardsSummary(lazy = true) {
    const [executionError, setExecutionError] = useState();
    const {data, error, loading, refetch} = useDataQuery(query, {lazy})
    const [update, {error: updateError, loading: updateLoading}] = useDataMutation(updateMutation)

    const addSingleScorecardSummary = async (updatedSummary) => {
        try {
            const updatedList = cloneDeep(data?.summary) ?? [];
            updatedList.push(updatedSummary)
            await update({
                data: updatedList
            })
        } catch (e) {
            setExecutionError(e)
        }
    }
    const updateSingleScorecardSummary = async (id, updatedSummary) => {
        try {
            const updatedList = cloneDeep(data?.summary) ?? [];
            updatedList.splice(findIndex(updatedList, ['id', id]), 1, updatedSummary)
            await update({
                data: updatedList
            })
        } catch (e) {
            setExecutionError(e)
        }
    }
    const removeSingleScorecardSummary = async (id) => {
        try {
            const updatedList = cloneDeep(data?.summary) ?? [];
            updatedList.splice(findIndex(updatedList, ['id', id]), 1)
            await update({
                data: updatedList
            })
        } catch (e) {
            setExecutionError(e)
        }
    }

    return {
        summary: data?.summary ?? [],
        error: error ?? updateError ?? executionError,
        loading,
        updateLoading,
        refetch,
        updateSingleScorecardSummary,
        removeSingleScorecardSummary,
        addSingleScorecardSummary
    }
}

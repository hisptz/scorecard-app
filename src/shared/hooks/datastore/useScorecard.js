import {useDataMutation, useDataQuery} from "@dhis2/app-runtime";
import {get} from 'lodash'
import {useState} from "react";
import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS} from "../../../core/constants/config";
import useScorecardsSummary from "./useScorecardsSummary";


function generateScorecardSummary(data) {
    const summary = {}
    for (const detail of DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS) {
        summary[detail.key] = get(data, detail.path)
    }
    return summary;
}

const query = {
    scorecard: {
        resource: DATASTORE_ENDPOINT,
        id: ({id}) => id,
    }
}

const updateMutation = {
    type: 'update',
    resource: DATASTORE_ENDPOINT,
    id: ({id}) => id,
    data: ({data}) => data
}

const deleteMutation = {
    type: 'delete',
    resource: DATASTORE_ENDPOINT,
    id: ({id}) => id,
}

const addMutation = {
    type: 'add',
    resource: DATASTORE_ENDPOINT,
    data: ({data}) => data
}

export default function useScorecard(id) {
    const [executionError, setExecutionError] = useState();
    const {loading: queryLoading, data, error: queryError, refetch} = useDataQuery(query, {variables: {id}})
    const [removeMutate, {
        loading: removeLoading,
        error: removeError
    }] = useDataMutation(updateMutation, {variables: {id}})
    const [updateMutate, {loading: setLoading, error: setError}] = useDataMutation(deleteMutation, {variables: {id}})
    const [addMutate, {loading: addLoading, error: addError}] = useDataMutation(addMutation)
    const {
        addSingleScorecardSummary,
        updateSingleScorecardSummary,
        removeSingleScorecardSummary
    } = useScorecardsSummary()

    const add = async (data) => {
        try {
            const scorecardSummary = generateScorecardSummary(data)
            await addSingleScorecardSummary(scorecardSummary);
            await addMutate({data})
        } catch (e) {
            setExecutionError(e)
        }
    }
    const update = async (id, data) => {
        try {
            const scorecardSummary = generateScorecardSummary(data)
            await updateSingleScorecardSummary(id, scorecardSummary);
            await updateMutate({id, data})
        } catch (e) {
            setExecutionError(e)
        }
    }
    const remove = async (id) => {
        try {
            await removeSingleScorecardSummary(id)
            await removeMutate({id})
        } catch (e) {
            setExecutionError(e)
        }
    }

    return {
        add,
        scorecard: data?.scorecard,
        update,
        remove,
        refetch,
        error: queryError ?? removeError ?? setError ?? addError ?? executionError,
        loading: queryLoading,
        mutationLoading: removeLoading || setLoading || addLoading
    }
}

import {useDataEngine, useDataMutation, useDataQuery,} from "@dhis2/app-runtime";
import produce from "immer";
import {get, set} from "lodash";
import {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS,} from "../../../core/constants/config";
import ScorecardConfState from "../../../core/state/scorecard";
import {uid} from "../../utils/utils";
import useScorecardsSummary from "./useScorecardsSummary";

function generateScorecardSummary(data) {
    const summary = {};
    for (const detail of DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS) {
        summary[detail.key] = get(data, detail.path);
    }
    return summary;
}

const query = {
    scorecard: {
        resource: DATASTORE_ENDPOINT,
        id: ({id}) => id,
    },
};

const updateMutation = {
    type: "update",
    resource: DATASTORE_ENDPOINT,
    id: ({id}) => id,
    data: ({data}) => data,
};

const deleteMutation = {
    type: "delete",
    resource: DATASTORE_ENDPOINT,
    id: ({id}) => id,
};

const generateCreateMutation = (id) => ({
    type: "create",
    resource: `${DATASTORE_ENDPOINT}/${id}`,
    data: ({data}) => data,
});

export function useDeleteScorecard(id) {
    const [executionError, setExecutionError] = useState();
    const [removeMutate, {loading, error: removeError}] = useDataMutation(
        deleteMutation,
        {variables: {id}}
    );
    const {removeSingleScorecardSummary, error} = useScorecardsSummary();

    const remove = async () => {
        try {
            await removeMutate({id});
            await removeSingleScorecardSummary(id);
        } catch (e) {
            console.log(e)
            setExecutionError(e);
        }
    };

    return {
        remove,
        error: removeError ?? executionError ?? error,
        loading,
    };
}

export function useUpdateScorecard(id) {
    const [executionError, setExecutionError] = useState();
    const [updateMutate, {loading, error: setError}] = useDataMutation(
        updateMutation,
        {variables: {id}}
    );
    const {updateSingleScorecardSummary} = useScorecardsSummary();

    const update = async (data) => {
        try {
            const scorecardSummary = generateScorecardSummary(data);
            await updateSingleScorecardSummary(id, scorecardSummary);
            await updateMutate({id, data});
        } catch (e) {
            setExecutionError(e);
        }
    };

    return {
        update,
        error: executionError ?? setError,
        loading,
    };
}

export function useAddScorecard() {
    const [error, setExecutionError] = useState();
    const [loading, setLoading] = useState(false);
    const engine = useDataEngine();
    const {addSingleScorecardSummary} = useScorecardsSummary();

    const add = async (data) => {
        try {
            setLoading(true);
            const id = uid();
            const updatedData = produce(data, draft => {
                set(draft, "id", id);
            })
            const scorecardSummary = generateScorecardSummary(updatedData);
            await addSingleScorecardSummary(scorecardSummary);
            await engine.mutate(generateCreateMutation(id), {variables: {data: updatedData}});
        } catch (e) {
            setExecutionError(e);
        }
        setLoading(false);
    };

    return {
        add,
        loading,
        error,
    };
}

export default function useScorecard() {
    const setScorecardState = useSetRecoilState(ScorecardConfState);
    const {loading, data, error, refetch} = useDataQuery(query, {lazy: true});

    const set = async (id) => {
        await refetch({id});
    };

    useEffect(() => {
        function setState() {
            if (data?.scorecard) {
                setScorecardState(() => data?.scorecard);
            }
        }

        setState();
    }, [data]);

    return {
        loading,
        error,
        set,
    };
}

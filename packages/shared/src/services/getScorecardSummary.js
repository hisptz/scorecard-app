import {compact, filter, isEmpty} from "lodash";
import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_KEY} from "../constants";
import {generateScorecardSummary} from "../utils";

const query = {
    summary: {
        resource: DATASTORE_ENDPOINT,
        id: DATASTORE_SCORECARD_SUMMARY_KEY,
    },
};

const addMutation = {
    type: "create",
    resource: `${DATASTORE_ENDPOINT}/${DATASTORE_SCORECARD_SUMMARY_KEY}`,
    data: ({data}) => data,
};

async function initializeKey(engine) {
    return await engine.mutate(addMutation, {variables: {data: []}});
}

export default async function getScorecardSummary(engine) {
    try {
        const response = await engine.query(query);
        return {summary: response?.summary};
    } catch (e) {
        if (e?.details?.httpStatusCode === 404) {
            await initializeKey(engine);
            return getScorecardSummary(engine);
        }
        return {error: e};
    }
}

const restoreQuery = {
    scorecards: {
        resource: DATASTORE_ENDPOINT,
    },
};

const restoreMutation = {
    type: "update",
    resource: DATASTORE_ENDPOINT,
    id: DATASTORE_SCORECARD_SUMMARY_KEY,
    data: ({data}) => data,
};

const singleScorecardQuery = {
    scorecard: {
        resource: DATASTORE_ENDPOINT,
        id: ({id}) => id,
    },
};

export const restoreScorecardSummary = async (engine) => {
    const {summary, error} = await getScorecardSummary(engine);
    if (!error) {
        const {scorecards: allKeys} = await engine.query(restoreQuery);
        const scorecards = filter(
            allKeys,
            (key) => key !== "settings" && key !== "savedObjects"
        );
        if (!isEmpty(scorecards)) {
            const scorecardsToRestore = filter(scorecards, (key) => {
                return !summary?.map(({id}) => id)?.includes(key);
            });
            if (!isEmpty(scorecardsToRestore)) {
                const updatedSummary = [...summary];
                for (const scorecardId of scorecardsToRestore) {
                    const {scorecard} = await engine.query(singleScorecardQuery, {
                        variables: {id: scorecardId},
                    });
                    const scorecardSummary = generateScorecardSummary(scorecard);
                    updatedSummary.push(scorecardSummary);
                }
                await engine.mutate(restoreMutation, {
                    variables: {data: updatedSummary.filter((summary) => !isEmpty(compact(Object.values(summary))))},
                });
            }
        }
    }
};

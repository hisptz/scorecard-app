import {
    DATASTORE_ENDPOINT,
    DATASTORE_OLD_SCORECARD_ENDPOINT,
    DATASTORE_SCORECARD_SUMMARY_KEY
} from "@hisptz/scorecard-constants";
import {generateCreateMutation} from "@hisptz/scorecard-utils";
import {filter, forIn, fromPairs, isEmpty} from "lodash";
import {DATASTORE_WIDGET_NAMESPACE,DATASTORE_OLD_WIDGET_NAMESPACE} from "../../../../../constants/scorecard";


const generateOldScorecardQueries = (ids = []) => {
    return fromPairs(
        ids?.map((id) => [
            id,
            {
                resource: DATASTORE_OLD_SCORECARD_ENDPOINT,
                id,
            },
        ])
    );
};

export async function getOldScorecards(engine, keys) {
    if (isEmpty(keys)) {
        return [];
    }
    const oldScorecardsObject = await engine.query(
        generateOldScorecardQueries(keys)
    );
    const oldScorecardsList = [];
    forIn(oldScorecardsObject, (value, key) => {
        oldScorecardsList.push({...value, id: key});
    });

    return oldScorecardsList;
}

export const uploadNewScorecard = async ({newScorecard, engine}) => {
    if (newScorecard) {
        return await engine.mutate(generateCreateMutation(newScorecard?.id), {
            variables: {data: newScorecard},
        });
    }
};


export async function getOldScorecardKeys(engine) {
    try {
        const {keys} = await engine.query({
            keys: {
                resource: DATASTORE_OLD_WIDGET_NAMESPACE,
            }
        }) ?? {};
        return keys;
    } catch (e) {
        return [];
    }
}

export async function getNewScorecardKeys(engine){
    try {
        const {keys} =  await engine.query({
            keys: {
                resource: DATASTORE_WIDGET_NAMESPACE ,
            }
        }) ?? {};
        return keys;
    } catch (error) {
        return ;
     }
}

export async function getScorecardKeys(engine) {
    try {
        const {keys} = await engine.query({
            keys: {
                resource: DATASTORE_ENDPOINT,
            }
        }) ?? {};
        return filter(keys, (key) => !(key.includes(DATASTORE_SCORECARD_SUMMARY_KEY) || key.includes("settings") || key.includes("savedObjects")));
    } catch (e) {
        return [];
    }
}

const summaryMutation = {
    type: "update",
    resource: DATASTORE_ENDPOINT,
    id: DATASTORE_SCORECARD_SUMMARY_KEY,
    data: ({data}) => data,
};

export const uploadSummary = async (engine, summary) => {
    return await engine.mutate(summaryMutation, {variables: {data: summary}});
};

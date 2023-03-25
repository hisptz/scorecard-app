import {
    DATASTORE_SCORECARD_SUMMARY_KEY
} from "@scorecard/shared";
import {generateCreateMutation} from "@scorecard/shared";
import {filter, forIn, fromPairs, isEmpty, omit} from "lodash";
import {
    DATASTORE_WIDGET_NAMESPACE,
    DATASTORE_OLD_WIDGET_NAMESPACE,
    DATASTORE_WIDGET
} from "../../../../../constants/scorecard";


const generateOldScorecardQueries = (ids = []) => {
    return fromPairs(
        ids?.map((id) => {
            return [
                id,
                {
                    resource: DATASTORE_OLD_WIDGET_NAMESPACE,
                    id,
                },
            ]
        })
    );
};

export async function getOldScorecardWidgets(engine, keys) {
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



export async function uploadNewScorecardWidget({newScorecardWidget, engine}) {
    let dashboardIdValue = newScorecardWidget?.dashboardId;
    let widget  = omit(newScorecardWidget, ["id"]);
    const addWidgetMutation = {
        type: "create",
        resource: `${DATASTORE_WIDGET}/${dashboardIdValue}`,
        data: ({data}) => data,
    };
    try {
        const response = await engine.mutate(addWidgetMutation, {variables: {data: widget}});
        return {widget: response};
    } catch (e) {
        return {error: e};
    }
}





export async function getOldScorecardKeys(engine) {
    try {
        const {keys} = await engine.query({
            keys: {
                resource: DATASTORE_OLD_WIDGET_NAMESPACE,
            }
        }) ?? {};
        return filter(keys, (key) => !(key.includes(DATASTORE_SCORECARD_SUMMARY_KEY) || key.includes("settings") || key.includes("savedObjects")));
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
                resource: DATASTORE_WIDGET,
            }
        }) ?? {};
        return filter(keys, (key) => !(key.includes(DATASTORE_SCORECARD_SUMMARY_KEY) || key.includes("settings") || key.includes("savedObjects")));
    } catch (e) {
        return [];
    }
}



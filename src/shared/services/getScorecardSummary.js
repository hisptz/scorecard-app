import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_KEY} from "../../core/constants/config";

const query = {
    summary: {
        resource: DATASTORE_ENDPOINT,
        id: DATASTORE_SCORECARD_SUMMARY_KEY
    }
}

const addMutation = {
    type: 'create',
    resource: `${DATASTORE_ENDPOINT}/${DATASTORE_SCORECARD_SUMMARY_KEY}`,
    data: ({data}) => data,
}

async function initializeKey(engine) {
    return await engine.mutate(addMutation, {variables: {data: []}})
}

export default async function getScorecardSummary(engine) {
    try {
        const response = await engine.query(query)
        return {summary: response?.summary}
    } catch (e) {
        if(e?.details?.httpStatusCode === 404){
            await initializeKey(engine)
            return getScorecardSummary(engine)
        }
        return {error: e}
    }

}

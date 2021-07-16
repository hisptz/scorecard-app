import {DATASTORE_ENDPOINT} from "../../core/constants/config";


const query = {
    scorecard: {
        resource: DATASTORE_ENDPOINT,
        id: ({id}) => id,
    }
}

export default async function getScorecard(id = '', engine) {
    if (id) {
        try {
            const response = await engine.query(query, {variables: {id}})
            return {scorecard: response?.scorecard};
        } catch (e) {
            return {error: e}
        }
    }
    return {error: 'not found'}
}

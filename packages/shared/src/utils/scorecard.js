import {get} from "lodash";
import {DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS} from "../constants";

export function generateScorecardSummary(data) {
    const summary = {};
    for (const detail of DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS) {
        summary[detail.key] = get(data, detail.path);
    }
    return summary;
}

export const generateCreateMutation = (id) => ({
    type: "create",
    resource: `${DATASTORE_ENDPOINT}/${id}`,
    data: ({data}) => data,
});

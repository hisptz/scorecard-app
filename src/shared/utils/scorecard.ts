import { get } from "lodash";
import {
	DATASTORE_ENDPOINT,
	DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS,
} from "../constants";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";

export function generateScorecardSummary(data: any) {
	const summary: any = {};
	for (const detail of DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS) {
		summary[detail.key] = get(data, detail.path);
	}
	return summary;
}

export const generateCreateMutation = (id: string) => ({
	type: "create",
	resource: `${DATASTORE_ENDPOINT}/${id}`,
	data: ({ data }: { data: ScorecardConfig }) => data,
});

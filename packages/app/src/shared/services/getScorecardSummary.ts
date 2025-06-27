import { DATASTORE_ENDPOINT, DATASTORE_SCORECARD_SUMMARY_KEY } from "../constants";
import { useDataEngine } from "@dhis2/app-runtime";

const query = {
	summary: {
		resource: DATASTORE_ENDPOINT,
		id: DATASTORE_SCORECARD_SUMMARY_KEY
	}
};

const addMutation = {
	type: "create",
	resource: `${DATASTORE_ENDPOINT}/${DATASTORE_SCORECARD_SUMMARY_KEY}`,
	data: ({ data }: any) => data
};

async function initializeKey(engine: any) {
	return await engine.mutate(addMutation, { variables: { data: [] } });
}

export default async function getScorecardSummary(engine: ReturnType<typeof useDataEngine>) {
	try {
		const response = await engine.query(query);
		return { summary: response?.summary };
	} catch (e) {
		if (e?.details?.httpStatusCode === 404) {
			await initializeKey(engine);
			return getScorecardSummary(engine);
		}
		return { error: e };
	}
}

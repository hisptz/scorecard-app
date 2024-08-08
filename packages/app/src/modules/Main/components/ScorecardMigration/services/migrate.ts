import {
	DATASTORE_ENDPOINT,
	DATASTORE_OLD_SCORECARD_ENDPOINT,
	DATASTORE_SCORECARD_SUMMARY_KEY,
	generateCreateMutation,
} from "@scorecard/shared";
import { filter, forIn, fromPairs, isEmpty } from "lodash";

const generateOldScorecardQueries = (ids = []) => {
	return fromPairs(
		ids?.map((id) => [
			id,
			{
				resource: DATASTORE_OLD_SCORECARD_ENDPOINT,
				id,
			},
		]),
	);
};

export async function getOldScorecards(engine: any, keys: any) {
	if (isEmpty(keys)) {
		return [];
	}
	const oldScorecardsObject = await engine.query(
		generateOldScorecardQueries(keys),
	);
	const oldScorecardsList: any = [];
	forIn(oldScorecardsObject, (value, key) => {
		oldScorecardsList.push({ ...value, id: key });
	});

	return oldScorecardsList;
}

export const uploadNewScorecard = async ({ newScorecard, engine }: any) => {
	if (newScorecard) {
		return await engine.mutate(generateCreateMutation(newScorecard?.id), {
			variables: { data: newScorecard },
		});
	}
};

export async function getOldScorecardKeys(engine: any) {
	try {
		const { keys } =
			(await engine.query({
				keys: {
					resource: DATASTORE_OLD_SCORECARD_ENDPOINT,
				},
			})) ?? {};
		return keys;
	} catch (e) {
		return [];
	}
}

export async function getScorecardKeys(engine: any) {
	try {
		const { keys } =
			(await engine.query({
				keys: {
					resource: DATASTORE_ENDPOINT,
				},
			})) ?? {};
		return filter(
			keys,
			(key) =>
				!(
					key.includes(DATASTORE_SCORECARD_SUMMARY_KEY) ||
					key.includes("settings") ||
					key.includes("savedObjects")
				),
		);
	} catch (e) {
		return [];
	}
}

const summaryMutation = {
	type: "update",
	resource: DATASTORE_ENDPOINT,
	id: DATASTORE_SCORECARD_SUMMARY_KEY,
	data: ({ data }: any) => data,
};

export const uploadSummary = async (engine: any, summary: any) => {
	return await engine.mutate(summaryMutation, {
		variables: { data: summary },
	});
};

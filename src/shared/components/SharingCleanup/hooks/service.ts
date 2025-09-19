/*
* By default, sharing settings is part of the scorecard configuration, that should now change, The sharing settings should be effected to the dataStore object sharing instead.
*
* This implementation goes through all configured scorecards and updates the sharing settings as per the object. and then removes the sharing settings from the configuration
*
* Steps
* 1. Get all scorecards
* 2. Filter all scorecards that have sharing settings in the configuration
* 3. Update the sharing settings in the dataStore object
* 4. Remove the sharing settings from the configuration
* 5. Save the scorecards
* 7. Remove the scorecard-summary key -  it is no longer needed
* 6. Navigate to the start of the app
*
* Possible issues:
* 1. If we have a lot of scorecards, this will take a while to run. A progress bar would be nice.
* 2. If the process is interrupted, it might cause issues with the scorecards.
*
*
* */

import { DATASTORE_NAMESPACE } from "@/shared";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useEffect, useState } from "react";
import { isEmpty, padEnd } from "lodash";
import { useNavigate } from "react-router-dom";


interface DHIS2SharingObject {
	object: {
		id: string;
		publicAccess: string;
		externalAccess: boolean;
		user: { id: string },
		userAccesses: Array<{ id: string; access: string }>
		userGroupAccesses: Array<{ id: string; access: string }>
	};
}

const allScorecardsQuery = {
	all: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		params: {
			fields: ".",
			filter: ["sharing.owner:!null", "user:!null", "userGroupAccesses:!null", "userAccesses:!null", "external:!null", "userGroupAccesses:!null"],
			rootJunction: "or",
			pageSize: 100 //This is a safe bet. If there are more than 100 scorecards, and implicit pagination will occur.
		}
	}
};

const metaQuery = {
	meta: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ key }: { key: string }) => `${key}/metaData`
	}
};

const updateScorecardMutation = {
	type: "update",
	resource: `dataStore/${DATASTORE_NAMESPACE}`,
	id: ({ key }: { key: string }) => key,
	data: ({ data }: { data: ScorecardConfig }) => data
};

const updateSharingMutation = {
	type: "create",
	resource: "sharing",
	params: ({ id }: { id: string }) => {
		return {
			id,
			type: "dataStore"
		};
	},
	data: ({ data }: { data: DHIS2SharingObject }) => data
};

interface MetaResponse {
	meta: {
		id: string;

	};
}

interface Response {
	all: {
		entries: Array<{
			key: string;
			value: ScorecardConfig;
		}>
	};
}

export function useSharingCleanup() {
	const navigate = useNavigate();
	const [mutateSharing] = useDataMutation(updateSharingMutation as unknown as any, {});
	const [mutateScorecard] = useDataMutation(updateScorecardMutation as unknown as any, {});
	const { refetch: getItemMeta } = useDataQuery(metaQuery as unknown as any, {
		lazy: true
	});
	const { data, loading } = useDataQuery<Response>(allScorecardsQuery);
	const [processed, setProcessed] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);

	function getSharingFromConfig(scorecardConfig: ScorecardConfig): DHIS2SharingObject {
		const sharing = scorecardConfig.sharing;
		if (sharing) {
			return {
				object: {
					id: scorecardConfig.id,
					user: {
						id: sharing.owner
					},
					externalAccess: sharing.external,
					publicAccess: padEnd(sharing.public, 8, "-"),
					userAccesses: Object.values(sharing.users).map(({ access, ...rest }) => ({
						...rest,
						access: padEnd(access, 8, "-")
					})),
					userGroupAccesses: Object.values(sharing.userGroups).map(({ access, ...rest }) => ({
						...rest,
						access: padEnd(access, 8, "-")
					}))
				}
			};
		}
		//We have the old format here

		return {
			object: {
				user: scorecardConfig.user,
				userAccesses: scorecardConfig.userAccesses?.map(({ access, ...rest }) => ({
					...rest,
					access: padEnd(access, 8, "-")
				})),
				userGroupAccesses: scorecardConfig.userGroupAccesses?.map(({ access, ...rest }) => ({
					...rest,
					access: padEnd(access, 8, "-")
				})),
				publicAccess: padEnd(scorecardConfig.publicAccess?.access, 8, "-")
			}
		};
	}

	async function updateSharing(scorecardConfig: ScorecardConfig) {
		const meta = await getItemMeta({
			key: scorecardConfig.id
		}) as unknown as MetaResponse;
		const itemId = meta.meta.id;
		const sharingObject = getSharingFromConfig(scorecardConfig);
		await mutateSharing({
			id: itemId,
			data: sharingObject
		});
		return;
	}

	async function updateScorecards(scorecards: Array<ScorecardConfig>) {
		for (const scorecard of scorecards) {
			try {
				await updateSharing(scorecard);
				delete scorecard.sharing;
				delete scorecard.user;
				delete scorecard.userGroupAccesses;
				delete scorecard.userAccesses;
				delete scorecard.publicAccess;
				await mutateScorecard({
					key: scorecard.id,
					data: scorecard
				});
			} catch (error) {
				console.error(error);
				console.error(`Could not cleanup ${scorecard.id}. Skipping.`);
			} finally {
				setProcessed((prev) => prev + 1);
				console.log(`Processed ${processed}/${total}`);
			}
		}
	}

	useEffect(() => {
		async function process() {
			await updateScorecards(data?.all.entries.map(({ value }) => value) ?? []);
		}

		if (data) {
			if (!isEmpty(data.all.entries)) {
				setTotal(data.all.entries.length);
				setProcessed(0);
				process().then(() => {
					console.info("Done!");
					navigate("/");
				});
			} else {
				navigate("/");
			}
		}
	}, [data?.all]);


	return {
		loading,
		processed,
		total
	};
}

export function useSharingCleanupCheck() {
	const { data, loading } = useDataQuery<Response>(allScorecardsQuery);
	const shouldCheck = !isEmpty(data?.all.entries);

	return {
		loading,
		shouldCheck
	};
}

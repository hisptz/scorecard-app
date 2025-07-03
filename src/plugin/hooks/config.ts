import { DATASTORE_WIDGET_NAMESPACE } from "../constants/scorecard";
import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { useCallback } from "react";
import { DATASTORE_NAMESPACE } from "../../shared";
import { useBoolean } from "usehooks-ts";

export interface ScorecardPluginConfig {
	dashboardItemId: string;
	scorecardId: string;
}

const query = {
	config: {
		resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}`,
		id: ({ id }: { id: string }) => id,
	},
};

type Response = {
	config: ScorecardPluginConfig;
};

export function useGetPluginConfig(dashboardItemId: string) {
	//@ts-expect-error app-runtime query type errors
	const { data, ...rest } = useDataQuery<Response>(query, {
		variables: {
			id: dashboardItemId,
		},
	});

	return {
		config: data?.config as ScorecardPluginConfig,
		...rest,
	};
}

function getCreateMutation(dashboardItemId: string) {
	return {
		type: "create",
		resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}/${dashboardItemId}`,
		data: ({ data }: { data: ScorecardPluginConfig }) => data,
	};
}

const deleteMutation = {
	type: "delete",
	resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}`,
	id: ({ id }: { id: string }) => id,
};

export function useManagePluginConfig(dashboardItemId: string) {
	const engine = useDataEngine();
	const { value: loading, setTrue, setFalse } = useBoolean();
	const addConfig = useCallback(
		async (config: ScorecardPluginConfig) => {
			try {
				setTrue();
				const mutation = getCreateMutation(dashboardItemId);
				//@ts-expect-error app runtime mutation errors
				await engine.mutate(mutation, {
					variables: {
						data: config,
					},
				});
				//Updating sharing settings to match the scorecard's
				const sharingConfig = (await engine.query({
					scorecardSharing: {
						resource: `dataStore/${DATASTORE_NAMESPACE}/${config.scorecardId}/metaData`,
					},
					dashboardItemMeta: {
						resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}/${dashboardItemId}/metaData`,
					},
				})) as {
					scorecardSharing: {
						sharing: {
							users: Record<string, unknown>;
							userGroups: Record<string, unknown>;
							public: string;
						};
					};
					dashboardItemMeta: {
						sharing: {
							users: Record<string, unknown>;
							userGroups: Record<string, unknown>;
							public: string;
						};
						id: string;
					};
				};
				const newSharing = {
					...sharingConfig.dashboardItemMeta.sharing,
					users: sharingConfig.scorecardSharing.sharing.users,
					userGroups:
						sharingConfig.scorecardSharing.sharing.userGroups,
					public: sharingConfig.scorecardSharing.sharing.public,
				};
				await engine.mutate({
					type: "create",
					resource: "sharing",
					params: {
						id: sharingConfig.dashboardItemMeta.id,
						type: "dataStore",
					},
					data: newSharing,
				});
			} catch (error) {
				console.error(
					`Could not save configuration for dashboardItemId ${dashboardItemId}`
				);
				throw error;
			} finally {
				setFalse();
			}
		},
		[engine]
	);

	const deleteConfig = useCallback(async () => {
		//@ts-expect-error app runtime mutation errors
		await engine.mutate(deleteMutation, {
			variables: {
				id: dashboardItemId,
			},
		});
	}, [engine]);

	return {
		addConfig,
		loading,
		deleteConfig,
	};
}

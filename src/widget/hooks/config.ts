import { DATASTORE_WIDGET_NAMESPACE } from "../constants/scorecard";
import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { useCallback } from "react";

export interface ScorecardPluginConfig {
	dashboardItemId: string;
	scorecardId: string;
}

const query = {
	config: {
		resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}`,
		id: ({ id }: { id: string }) => id
	}
};

type Response = {
	config: ScorecardPluginConfig;
}


export function useGetPluginConfig(dashboardItemId: string) {
	//@ts-expect-error app-runtime query type errors
	const { data, ...rest } = useDataQuery<Response>(query, {
		variables: {
			id: dashboardItemId
		}
	});

	return {
		config: data?.config as ScorecardPluginConfig,
		...rest
	};
}

function getCreateMutation(dashboardItemId: string) {
	return {
		type: "create",
		resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}/${dashboardItemId}`,
		data: ({ data }: { data: ScorecardPluginConfig }) => data
	};
}

const deleteMutation = {
	type: "delete",
	resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}`,
	id: ({ id }: { id: string }) => id
};

export function useManagePluginConfig(dashboardItemId: string) {
	const engine = useDataEngine();
	const addConfig = useCallback(async (config: ScorecardPluginConfig) => {
		try {
			const mutation = getCreateMutation(dashboardItemId);
			//@ts-expect-error app runtime mutation errors
			return await engine.mutate(mutation, {
				variables: {
					data: config
				}
			});
		} catch (error) {
			console.error(`Could not save configuration for dashboardItemId ${dashboardItemId}`);
			throw error;
		}
	}, [engine]);

	const deleteConfig = useCallback(async () => {
		//@ts-expect-error app runtime mutation errors
		await engine.mutate(deleteMutation, {
			variables: {
				id: dashboardItemId
			}
		});
	}, [engine]);

	return {
		addConfig,
		deleteConfig
	};
}

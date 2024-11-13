import { DATASTORE_WIDGET_NAMESPACE } from "../../plugin/constants/scorecard";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";
import { usePluginConfig } from "../components/PluginConfigProvider";


const query: any = {
	dataStoreConfig: {
		resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}`,
		id: ({ id }: { id: string }) => id
	}
};

const createMutation = (id: string) => {
	return {
		resource: `dataStore/${DATASTORE_WIDGET_NAMESPACE}/${id}`,
		type: "create",
		data: ({ data }: { data: { dashboardItemId: string; scorecardId: string } }) => data
	} as any;
};


type Response = {
	dataStoreConfig: {
		dashboardItemId: string;
		scorecardId: string;
	}
}

export function usePluginConfigData(dashboardItemId: string | null) {
	const { loading, data, error } = useDataQuery<Response>(query, {
		variables: {
			id: dashboardItemId
		},
		lazy: !dashboardItemId
	});

	const itemConfig = useMemo(() => {
		return data?.dataStoreConfig ?? null;
	}, [data?.dataStoreConfig]);

	return {
		loading,
		error,
		itemConfig
	};
}

export function usePluginConfigSave() {
	const { dashboardItemId } = usePluginConfig();
	const [mutate, { loading }] = useDataMutation(createMutation(dashboardItemId));

	const save = async (data: { scorecardId: string }) => {
		return mutate({
			data: {
				dashboardItemId,
				scorecardId: data.scorecardId
			}
		});
	};

	return {
		save,
		saving: loading
	};
}

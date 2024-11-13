import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";
import { DATASTORE_NAMESPACE } from "@scorecard/shared";
import { usePluginConfig } from "../components/PluginConfigProvider";

const query: any = {
	config: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id
	}
};

type ConfigQueryResponse = {
	config: ScorecardConfig;
};

export function usePluginScorecardConfig() {
	const { scorecardId } = usePluginConfig();
	const { data, loading, refetch, error } = useDataQuery<ConfigQueryResponse>(
		query,
		{
			variables: {
				id: scorecardId
			}
		}
	);
	const config = useMemo(() => data?.config, [data?.config]);

	return {
		config,
		loading,
		error,
		refetch
	};
}

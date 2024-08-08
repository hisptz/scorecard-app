import { DATASTORE_NAMESPACE } from "../../../constants";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useDataQuery } from "@dhis2/app-runtime";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const query = {
	config: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id,
	},
};

type ConfigQueryResponse = {
	config: ScorecardConfig;
};

export function useScorecardConfig() {
	const { id } = useParams<{ id?: string }>();
	const { data, loading, refetch, error } = useDataQuery<ConfigQueryResponse>(
		query,
		{
			variables: {
				id,
			},
		},
	);
	const config = useMemo(() => data?.config, [data?.config]);

	return {
		config,
		loading,
		error,
		refetch,
	};
}

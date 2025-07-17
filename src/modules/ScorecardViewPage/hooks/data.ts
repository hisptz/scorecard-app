import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useDataQuery } from "@dhis2/app-runtime";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import {
	DATASTORE_NAMESPACE,
	getUserAuthority,
	SharingObject,
	UserState,
} from "../../../shared";
import { useRecoilValue } from "recoil";

const query = {
	config: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id,
	},
	metadata: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => `${id}/metaData`,
	},
};

type ConfigQueryResponse = {
	config: ScorecardConfig;
	metadata: {
		sharing: SharingObject;
	};
};

export function useScorecardConfigFromServer() {
	const user = useRecoilValue(UserState);
	const { id } = useParams<{ id?: string }>();
	const { data, loading, refetch, error } = useDataQuery<ConfigQueryResponse>(
		// @ts-expect-error query type error
		query,
		{
			variables: {
				id,
			},
		}
	);
	const access = useMemo(
		() =>
			data?.metadata.sharing
				? getUserAuthority(user!, data?.metadata.sharing)
				: {
						read: false,
						write: false,
						delete: false,
				  },
		[data?.metadata]
	);
	const config = useMemo(() => data?.config, [data?.config]);

	return {
		config,
		access,
		loading,
		error,
		refetch,
	};
}

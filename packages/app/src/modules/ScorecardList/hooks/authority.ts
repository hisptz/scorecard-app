import { DATASTORE_NAMESPACE, getUserAuthority, UserState } from "@scorecard/shared";
import { useDataQuery } from "@dhis2/app-runtime";
import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";

const metadataQuery: any = {
	meta: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => `${id}/metaData`
	}
};

export type Sharing = {
	owner: string;
	external: boolean;
	users: {
		[key: string]: {
			access: string;
			id: string;
		};
	};
	userGroups: {
		[key: string]: {
			access: string;
			id: string;
		};
	};
	public: string;
};

type MetaQueryResponse = {
	meta: {
		id: string;
		sharing: Sharing;
	};
};

export function useScorecardSharingSettings({ id }: { id: string }) {
	const user = useRecoilValue(UserState);
	const { data, loading, error } = useDataQuery<MetaQueryResponse>(
		metadataQuery,
		{
			variables: {
				id
			}
		}
	);
	const access = useMemo(() => {
		if (!data) {
			return {
				write: false,
				read: false,
				delete: false
			};
		} else {
			const sharing = data.meta.sharing;
			return getUserAuthority(user, sharing);
		}
	}, [data, user]);

	return {
		access,
		loading,
		error
	};
}

export function useGetScorecardSharingSettings() {
	const user = useRecoilValue(UserState);
	const { refetch } = useDataQuery<MetaQueryResponse>(
		metadataQuery,
		{
			lazy: true,
		}
	);
	return useCallback(async (id: string): Promise<{ read: boolean; write: boolean; delete?: boolean }> => {
		const data = await refetch({ id }) as MetaQueryResponse;
		if (!data) {
			return {
				write: false,
				read: false,
				delete: false
			};
		} else {
			const sharing = data.meta.sharing;
			return getUserAuthority(user, sharing);
		}
	}, [refetch]);
}

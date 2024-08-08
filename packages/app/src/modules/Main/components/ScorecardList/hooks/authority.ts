import {
	DATASTORE_NAMESPACE,
	getUserAuthority,
	UserState,
} from "@scorecard/shared";
import { useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

const metadataQuery: any = {
	meta: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => `${id}/metaData`,
	},
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
				id,
			},
		},
	);
	return useMemo(() => {
		if (!data) {
			return;
		} else {
			const sharing = data.meta.sharing;
			return getUserAuthority(user, sharing);
		}
	}, [data, user]);
}

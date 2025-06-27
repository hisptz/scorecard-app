import { DATASTORE_NAMESPACE, DATASTORE_OLD_SCORECARD_ENDPOINT, UserState } from "../../../shared";
import { OldScorecardSchema } from "../schemas/old";
import { useDataQuery } from "@dhis2/app-runtime";
import { Pager } from "@hisptz/dhis2-ui";
import { useRecoilValue } from "recoil";


const query: any = {
	data: {
		resource: `${DATASTORE_OLD_SCORECARD_ENDPOINT}`,
		params: ({ userId }: { userId: string }) => {
			return {
				fields: ".",
				paging: false,
				// filter: [
				// 	`user.id:eq:${userId}`
				// ]
			};
		}
	},
	newConfig: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`
	}
};

type Response = {
	data: {
		entries: Array<{
			key: string;
			value: OldScorecardSchema
		}>,
		pager: Pager
	} | [],
	newConfig: string[]
}

export function useOldScorecards() {
	const user = useRecoilValue(UserState);
	const { data, loading, error, refetch } = useDataQuery<Response>(query, {
		variables: {
			userId: user?.id
		}
	});

	const scorecards = Array.isArray(data?.data) ? [] : data?.data?.entries?.map(({ value, key }) => ({
		...value,
		id: key
	}));

	const existingScorecards = data?.newConfig ?? [];

	return {
		scorecards,
		existingScorecards,
		loading,
		error,
		refetch
	};
}





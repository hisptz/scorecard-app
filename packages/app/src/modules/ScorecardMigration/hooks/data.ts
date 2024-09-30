import { DATASTORE_OLD_SCORECARD_ENDPOINT } from "@scorecard/shared";
import { OldScorecardSchema } from "../schemas/old";
import { useDataQuery } from "@dhis2/app-runtime";
import { Pager } from "@hisptz/dhis2-ui";


const query = {
	data: {
		resource: `${DATASTORE_OLD_SCORECARD_ENDPOINT}`,
		params: {
			fields: ".",
			paging: false
		}
	}
};

type Response = {
	data: {
		entries: Array<{
			key: string;
			value: OldScorecardSchema
		}>,
		pager: Pager
	}
}

export function useOldScorecards() {
	const { data, loading, error, refetch } = useDataQuery<Response>(query);

	const scorecards = data?.data?.entries?.map(({ value, key }) => ({
		...value,
		id: key
	}));

	return {
		scorecards,
		loading,
		error,
		refetch
	};
}





import { SCORECARD_NAMESPACE } from "../constants/scorecard";
import { useDataQuery } from "@dhis2/app-runtime";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";


const query: any = {
	config: {
		resource: `dataStore/${SCORECARD_NAMESPACE}`,
		id: ({ id }: { id: string }) => id
	}
};

export function usePluginScorecard(scorecardId: string) {
	const { loading, data, error, ...rest } = useDataQuery<{ config: ScorecardConfig }>(query, {
		variables: {
			id: scorecardId
		}
	});

	return {
		loading,
		error,
		scorecard: data?.config,
		...rest
	};
}



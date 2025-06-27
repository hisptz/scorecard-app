import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useParams } from "react-router-dom";
import { usePluginScorecard } from "./data";
import { DATASTORE_NAMESPACE } from "../../shared";

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
	const { id } = useParams<{ id: string }>();
	const { loading, error, scorecard, ...rest } = usePluginScorecard(id!);

	return {
		config: scorecard,
		loading,
		error,
		...rest
	};
}

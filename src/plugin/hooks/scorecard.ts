import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useParams, useSearchParams } from "react-router-dom";
import { usePluginScorecard } from "./data";
import { DATASTORE_NAMESPACE } from "@/shared";
import { useMemo } from "react";

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
	const [searchParams] = useSearchParams();
	const { loading, error, scorecard, ...rest } = usePluginScorecard(id!);
	const { orgUnits, periods } = useMemo(() => {
		const orgUnits = searchParams.get("ou")?.split(",").map((id) => ({ id })) ?? [];
		const periods = searchParams.get("pe")?.split(",").map((id) => ({ id })) ?? [];

		return {
			orgUnits,
			periods
		};
	}, [searchParams]);

	return {
		config: scorecard,
		loading,
		error,
		orgUnits,
		periods,
		...rest
	};
}

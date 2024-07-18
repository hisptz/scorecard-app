import useTableDataSources from "./useTableDataSources";
import useTableLoadingState from "./useTableLoadingState";
import useTableOrgUnits from "./useTableOrgUnits";

export default function useTableConfig(
	dataEngine: any,
	orgUnits: any,
	nested: any,
) {
	const { loading: orgUnitLoading } = useTableOrgUnits(
		dataEngine,
		orgUnits,
		nested,
	);
	const { loading: dataSourcesLoading } = useTableDataSources(
		dataEngine,
		orgUnits,
	);
	useTableLoadingState(dataEngine, orgUnits);

	return {
		loading: orgUnitLoading || dataSourcesLoading,
	};
}

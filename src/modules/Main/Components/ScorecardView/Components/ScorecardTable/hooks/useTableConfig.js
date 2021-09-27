import useTableDataSources from "./useTableDataSources";
import useTableLoadingState from "./useTableLoadingState";
import useTableOrgUnits from "./useTableOrgUnits";

export default function useTableConfig(dataEngine, orgUnits) {
  const { loading: orgUnitLoading } = useTableOrgUnits(dataEngine, orgUnits);
  const { loading: dataSourcesLoading } = useTableDataSources(dataEngine);
  useTableLoadingState(dataEngine, orgUnits);

  return {
    loading: orgUnitLoading || dataSourcesLoading,
  };
}

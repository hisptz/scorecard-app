import useTableDataSources from "./useTableDataSources";
import useTableLoadingState from "./useTableLoadingState";
import useTableOrgUnits from "./useTableOrgUnits";

export default function useTableConfig(dataEngine, orgUnits, nested) {
  const { loading: orgUnitLoading } = useTableOrgUnits(dataEngine, orgUnits, nested);
  const { loading: dataSourcesLoading } = useTableDataSources(dataEngine, orgUnits);
  useTableLoadingState(dataEngine, orgUnits);

  return {
    loading: orgUnitLoading || dataSourcesLoading,
  };
}

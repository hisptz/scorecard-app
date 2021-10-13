import { getTableConfiguration } from "./get-table-configuration.helper";

export default function getTableLayers(
  visualizationLayers,
  visualizationType,
  interventionName
) {
  return (visualizationLayers || []).map((layer) => {
    return {
      tableConfiguration: getTableConfiguration(
        layer.config || {},
        layer.layout,
        visualizationType,
        layer.dataSelections,
        interventionName
      ),
      analyticsObject: layer.analytics,
    };
  });
}

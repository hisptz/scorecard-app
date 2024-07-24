import { getTableConfiguration } from "./get-table-configuration.helper";

export default function getTableLayers(
	visualizationLayers: any,
	visualizationType: any,
	interventionName: any,
) {
	return (visualizationLayers || []).map((layer: any) => {
		return {
			tableConfiguration: getTableConfiguration(
				layer.config || {},
				layer.layout,
				visualizationType,
				layer.dataSelections,
				interventionName,
			),
			analyticsObject: layer.analytics,
		};
	});
}

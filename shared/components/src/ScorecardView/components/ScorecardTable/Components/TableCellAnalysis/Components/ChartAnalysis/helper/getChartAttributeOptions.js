import { getAllowedChartType } from "./get-allowed-chart-types.helper";

export function getChartAttributeOptions(chartConfiguration) {
  const chartOptions = {
    renderTo: chartConfiguration.renderId,
    zoomType: "xy",
    type: getAllowedChartType(chartConfiguration.type),
  };

  /**
   * Extend Options depending on chart type
   */
  if (chartConfiguration.type === "pie") {
    chartOptions.plotBackgroundColor = null;
    chartOptions.plotBorderWidth = null;
    chartOptions.plotShadow = false;
  } else if (chartConfiguration.type === "radar") {
    chartOptions.polar = true;
  }

  return chartOptions;
}

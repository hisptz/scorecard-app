import { filter, map } from "lodash";
import { getChartAxisItems } from "./get-chart-axis-items.helper";
// import { getChartExportingOptions } from './get-chart-exporting-options.helper';
import { getChartSeriesWithAxisOptions } from "./get-chart-series-with-axis-options.helper";
import { getChartSeries } from "./get-chart-series.helper";
import { getChartYAxisOptions } from "./get-chart-y-axis-options.helper";
import { getChartXAxisOptions } from "./get-charts-x-axis-options.helper";
import { getSanitizedChartXAxisCategories } from "./get-sanitized-chart-x-axis-categories.helper";
import { getSortedChartSeries } from "./get-sorted-chart-series.helper";
import { getXAxisItemsFromChartConfiguration } from "./get-x-axis-items-from-chart-configuration.helper";

export function getOtherChartObject(
  initialChartObject,
  analyticsObject,
  chartConfiguration
) {
  const yAxisSeriesItems = getChartAxisItems(analyticsObject, [
    chartConfiguration.yAxisType,
  ]);

  /**
   * Sort the corresponding series
   */
  const sortedSeries = getSortedChartSeries(
    getChartSeries(
      analyticsObject,
      getChartAxisItems(analyticsObject, chartConfiguration.xAxisType, true),
      yAxisSeriesItems,
      chartConfiguration
    ),
    chartConfiguration.cumulativeValues ? -1 : chartConfiguration.sortOrder
  );

  /**
   * Update series with axis options
   */
  const seriesWithAxisOptions = getChartSeriesWithAxisOptions(
    sortedSeries,
    chartConfiguration.multiAxisTypes
  );

  /**
   * Update colors by considering if series has data
   */
  const newColors = filter(
    map(seriesWithAxisOptions, (seriesObject) =>
      seriesObject.data[0] ? seriesObject.data[0].color : undefined
    ),
    (color) => color
  );

  const xAxisItems = getXAxisItemsFromChartConfiguration(chartConfiguration);

  const xAxisCategories = getSanitizedChartXAxisCategories(
    seriesWithAxisOptions,
    xAxisItems
  );

  return {
    ...initialChartObject,
    yAxis: getChartYAxisOptions(chartConfiguration),
    xAxis: getChartXAxisOptions(xAxisCategories, chartConfiguration.type),
    colors: newColors.length > 0 ? newColors : initialChartObject.colors,
    series: seriesWithAxisOptions,
  };
}

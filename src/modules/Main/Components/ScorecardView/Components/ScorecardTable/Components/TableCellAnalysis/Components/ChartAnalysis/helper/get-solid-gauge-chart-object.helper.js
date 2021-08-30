import * as _ from 'lodash';
import { getChartAxisItems } from './get-chart-axis-items.helper';
import { getChartPaneOptions } from './get-chart-pane-options.helper';
import { getChartSeries } from './get-chart-series.helper';
import { getChartYAxisOptions } from './get-chart-y-axis-options.helper';
import { getSortedChartSeries } from './get-sorted-chart-series.helper';

export function getSolidGaugeChartObject(
  initialChartObject,
  analyticsObject,
  chartConfiguration
) {
  // todo make gauge chart more understanble in analyisis
  const newChartObject = _.clone(initialChartObject);
  const yAxisSeriesItems = getChartAxisItems(
    analyticsObject,
    chartConfiguration.yAxisType
  );

  /**
   * Get pane options
   */
  newChartObject.pane = getChartPaneOptions(chartConfiguration.type);

  /**
   * Get y axis options
   */
  newChartObject.yAxis = _.assign([], getChartYAxisOptions(chartConfiguration));

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

  return { ...newChartObject, series: sortedSeries };
}
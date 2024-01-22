import { getCumulativeFormatForAnalytics } from "./get-cumulative-format-for-analytics.helper";

export function getSanitizedanalyticsBasedOnConfiguration(
  analyticsObject,
  chartConfiguration
) {
  return chartConfiguration.cumulativeValues
    ? getCumulativeFormatForAnalytics(
        analyticsObject,
        chartConfiguration.xAxisType[0],
        chartConfiguration.yAxisType
      )
    : analyticsObject;
}

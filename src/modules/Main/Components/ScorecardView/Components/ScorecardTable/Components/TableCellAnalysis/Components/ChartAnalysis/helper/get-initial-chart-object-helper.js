import { getChartColors } from "./get-chart-colors.helper";
import { getChartCreditsOption } from "./get-chart-credit-options.helper";
import { getPlotOptions } from "./get-chart-plot-options.helper";
import { getChartSubtitleObject } from "./get-chart-subtitle.helper";
import { getChartTitleObject } from "./get-chart-title-object.helper";
import { getTooltipOptions } from "./get-chart-tooltip-options.helper";
import { getChartAttributeOptions } from "./getChartAttributeOptions";

export function getInitialChartObject(analyticsObject, chartConfiguration) {
  return {
    chart: getChartAttributeOptions(chartConfiguration),
    title: getChartTitleObject(chartConfiguration),
    subtitle: getChartSubtitleObject(chartConfiguration, analyticsObject),
    credits: getChartCreditsOption(),
    colors: getChartColors(),
    plotOptions: getPlotOptions(chartConfiguration),
    tooltip: getTooltipOptions(chartConfiguration),
  };
}

import * as _ from 'lodash';
import { getInitialChartObject } from './get-initial-chart-object-helper';
import { getOtherChartObject } from './get-other-chart-object.helper';
import { getPieChartObject } from './get-pie-chart-object.helper';
import { getSanitizedanalyticsBasedOnConfiguration } from './get-sanitized-analytics-based-on-chart-configuration.helper';
import { getSanitizedChartObject } from './get-sanitized-chart-object.helper';
import { getSolidGaugeChartObject } from './get-solid-gauge-chart-object.helper';
import { getSpiderWebChartObject } from './get-spider-web-chart-object.helper';



export function getCharObject(incommingAnalyticObject,chartConfiguration){

console.log("incomming AnalyticObject");
console.log(incommingAnalyticObject);
    const analyticsObject = getSanitizedanalyticsBasedOnConfiguration(
        incommingAnalyticObject,
        chartConfiguration,
    )
    let chartObjects;

    const chartObject = getInitialChartObject(
        analyticsObject,
        chartConfiguration
    )

     /**
   * Extend chart options depending on type
   */

  switch (chartConfiguration.type) {
    case 'radar':
      chartObjects =getSpiderWebChartObject(
        chartObject,
        analyticsObject,
        chartConfiguration
      );
      break;
    case 'solidgauge':
      chartObjects = getSolidGaugeChartObject(
        chartObject,
        analyticsObject,
        chartConfiguration
      );
      break;
    case 'gauge':
              const newChartConfiguration  =  _.clone(chartConfiguration);
      newChartConfiguration.type = 'solidgauge';
      chartObjects = getSolidGaugeChartObject(
        chartObject,
        analyticsObject,
        newChartConfiguration
      );
      break;
    case 'pie':
      chartObjects = getPieChartObject(
        chartObject,
        analyticsObject,
        chartConfiguration
      );
      break;
    case 'combined':
      break;
    default:
      chartObjects = getOtherChartObject(
        chartObject,
        analyticsObject,
        chartConfiguration
      );
      break;
  }
  return getSanitizedChartObject(chartObjects, chartConfiguration);
}
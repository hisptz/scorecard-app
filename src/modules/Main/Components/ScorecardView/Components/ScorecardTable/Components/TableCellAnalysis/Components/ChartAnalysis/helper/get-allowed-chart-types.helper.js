/* eslint-disable no-case-declarations */
export function getAllowedChartType(chartType) {
    let newChartType = '';
    switch (chartType) {
      case 'radar':
        newChartType = 'line';
        break;
      case 'dotted':
        newChartType = 'line';
        break;
      default:
        // const splitedChartType = chartType.split('_');
        // newChartType =
        //   splitedChartType.length > 1 ? splitedChartType[1] : splitedChartType[0];
        break;
    }
    return newChartType;
  }
  
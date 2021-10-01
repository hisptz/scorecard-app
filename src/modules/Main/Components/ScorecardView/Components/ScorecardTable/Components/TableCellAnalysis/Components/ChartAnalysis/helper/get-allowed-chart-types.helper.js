/* eslint-disable no-case-declarations */
export function getAllowedChartType(chartType) {
  let newChartType = "";
  switch (chartType) {
    case "radar":
      newChartType = "line";
      break;
    case "dotted":
      newChartType = "line";
      break;
    default:
      newChartType = chartType;
      break;
  }
  return newChartType;
}

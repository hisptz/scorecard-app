import * as _ from 'lodash';
export function getChartSubtitleObject(
  chartConfiguration,
  analyticsObject){

  if (chartConfiguration.hideSubtitle) {
    return null;
  }
  return {
    text: _.map(chartConfiguration.zAxisType, (zAxis) =>
      _.map(
        analyticsObject && analyticsObject.metaData
          ? analyticsObject.metaData[zAxis] || []
          : [],
        (itemId) =>
          analyticsObject &&
          analyticsObject.metaData &&
          analyticsObject.metaData.names
            ? analyticsObject.metaData.names[itemId] || []
            : []
      ).join(', ')
    ).join(' - '),
    align: 'left',
    style: {
      fontWeight: '600',
      fontSize: '13px',
    }
  };
}

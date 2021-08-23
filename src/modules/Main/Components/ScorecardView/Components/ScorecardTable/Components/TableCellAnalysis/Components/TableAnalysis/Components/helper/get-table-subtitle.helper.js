import * as _ from 'lodash';

export  function getTableSubtitle(
  tableConfiguration,
  analyticsObject
) {
  return _.map(tableConfiguration.filter, (filter) =>
    _.map(
      analyticsObject && analyticsObject.metaData
        ? analyticsObject.metaData[filter] || []
        : [],
      (itemId) =>
        analyticsObject &&
        analyticsObject.metaData &&
        analyticsObject.metaData.names
          ? analyticsObject.metaData.names[itemId] || []
          : []
    ).join(', ')
  ).join(' - ');
}

import * as _ from 'lodash';


export function findDataValuesFromAnalytics(analyticsObject, dataRowIds){
    const analyticsHeaders = analyticsObject
      ? analyticsObject.headers || []
      : [];
    const dataIndex = analyticsHeaders.indexOf(
      _.find(analyticsHeaders, ['name', 'value'])
    );

    return _.filter(
      _.map(
        _.filter(
          analyticsObject ? analyticsObject.rows || [] : [],
          (row) =>
            _.intersection(dataRowIds, row).length === dataRowIds.length
        ),
        dataRow => parseFloat(dataRow[dataIndex])
      ),
      dataValue => !isNaN(dataValue)
    );
  }
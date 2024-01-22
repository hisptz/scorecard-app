import { filter, find, intersection, map } from "lodash";

export function findDataValuesFromAnalytics(analyticsObject, dataRowIds) {
  const analyticsHeaders = analyticsObject ? analyticsObject.headers || [] : [];
  const dataIndex = analyticsHeaders.indexOf(
    find(analyticsHeaders, ["name", "value"])
  );

  return filter(
    map(
      filter(
        analyticsObject ? analyticsObject.rows || [] : [],
        (row) => intersection(dataRowIds, row).length === dataRowIds.length
      ),
      (dataRow) => parseFloat(dataRow[dataIndex])
    ),
    (dataValue) => !isNaN(dataValue)
  );
}

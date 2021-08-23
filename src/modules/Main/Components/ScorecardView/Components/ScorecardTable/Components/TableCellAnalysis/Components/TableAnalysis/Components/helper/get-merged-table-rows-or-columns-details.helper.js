import * as _ from 'lodash';
import { getFilteredTableRows } from './get-filtered-table-rows.helper';

export  function getMergedTableRowsOrColumnsDetails(
  tableDataRowsOrColumns,
  dxGroupMembers
) {
  const availableParent = {};
  const mergedDataRowsOrColumnsArray = _.map(
    getFilteredTableRows(tableDataRowsOrColumns, dxGroupMembers),
    (filteredDataRow) =>
      _.filter(
        _.map(filteredDataRow, (filterDataCell) => {
          if (!availableParent[filterDataCell.id]) {
            if (filterDataCell.id) {
              availableParent[filterDataCell.id] = 1;
            }
            return filterDataCell;
          }

          availableParent[filterDataCell.id] =
            availableParent[filterDataCell.id] + 1;
          return null;
        }),
        dataCell => dataCell
      )
  );

  return { availableParent, mergedDataRowsOrColumnsArray };
}

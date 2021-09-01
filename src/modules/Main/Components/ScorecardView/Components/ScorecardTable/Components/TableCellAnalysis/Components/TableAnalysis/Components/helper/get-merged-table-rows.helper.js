/* eslint-disable import/named */
import * as _ from 'lodash';
import { getMergedTableRowsOrColumnsDetails } from './get-merged-table-rows-or-columns-details.helper';

export  function getMergedTableRows(tableDataRows, dxGroupMembers) {
  const {
    availableParent,
    mergedDataRowsOrColumnsArray
  } = getMergedTableRowsOrColumnsDetails(tableDataRows, dxGroupMembers);

  return _.map(mergedDataRowsOrColumnsArray, (mergedDataRows) =>
    _.map(mergedDataRows, (mergedDataCell) => {
      return {
        ...mergedDataCell,
        rowSpan: availableParent[mergedDataCell.id]
      };
    })
  );
}

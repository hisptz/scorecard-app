/* eslint-disable import/named */
import * as _ from 'lodash';
import { getFlattenedTableRows } from './get-flattened-table-rows.helper';
import { getMatchingTableRowsOrColumns } from './get-matching-table-rows-or-columns.helper';

export  function getFilteredTableRows(tableDataRows, dxGroupMembers) {
  return _.filter(
    getFlattenedTableRows(tableDataRows),
    (tableDataRow) =>
      getMatchingTableRowsOrColumns(tableDataRow, dxGroupMembers).length > 0
  );
}

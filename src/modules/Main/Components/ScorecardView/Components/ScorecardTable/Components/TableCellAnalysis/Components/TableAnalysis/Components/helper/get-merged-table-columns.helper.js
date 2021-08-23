/* eslint-disable import/named */
import _ from 'lodash';
import { getMatchingTableRowsOrColumns } from './get-matching-table-rows-or-columns.helper';

export  function getMergedTableColumns(
  tableDataColumns,
  dxGroupMembers
) {

  const availableParent = {};
  const mergedTableColumnsArray = _.map(
    tableDataColumns,
    (tableDataRow) => {
      const matchingTableColumns = getMatchingTableRowsOrColumns(
        tableDataRow,
        dxGroupMembers
      );

     
      _.each(matchingTableColumns, (matchingTableColumn) => {
        _.each(
          _.filter(
            matchingTableColumn.dataRowIds,
            dataRowId => dataRowId !== matchingTableColumn.id
          ),
          (dataRowId) => {
            if (availableParent[dataRowId]) {
              availableParent[dataRowId] = availableParent[dataRowId] + 1;
            } else {
              availableParent[dataRowId] = 1;
            }
          }
        );
      });

      return matchingTableColumns.length > 0
        ? matchingTableColumns
        : tableDataRow;
    }
  );

  return _.map(mergedTableColumnsArray, (mergedDataColumns) =>
    _.map(mergedDataColumns, (mergedDataCell) => {
      return {
        ...mergedDataCell,
        colSpan: availableParent[mergedDataCell.id]
      };
    })
  );
}

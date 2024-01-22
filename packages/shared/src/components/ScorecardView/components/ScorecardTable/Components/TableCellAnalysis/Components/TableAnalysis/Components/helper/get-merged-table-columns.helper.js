/* eslint-disable import/named */
import { each, filter, map } from "lodash";
import { getMatchingTableRowsOrColumns } from "./get-matching-table-rows-or-columns.helper";

export function getMergedTableColumns(tableDataColumns, dxGroupMembers) {
  const availableParent = {};
  const mergedTableColumnsArray = map(tableDataColumns, (tableDataRow) => {
    const matchingTableColumns = getMatchingTableRowsOrColumns(
      tableDataRow,
      dxGroupMembers
    );

    each(matchingTableColumns, (matchingTableColumn) => {
      each(
        filter(
          matchingTableColumn.dataRowIds,
          (dataRowId) => dataRowId !== matchingTableColumn.id
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
  });

  return map(mergedTableColumnsArray, (mergedDataColumns) =>
    map(mergedDataColumns, (mergedDataCell) => {
      return {
        ...mergedDataCell,
        colSpan: availableParent[mergedDataCell.id],
      };
    })
  );
}

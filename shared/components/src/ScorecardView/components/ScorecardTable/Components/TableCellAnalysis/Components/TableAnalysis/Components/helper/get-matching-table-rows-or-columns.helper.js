import { filter } from "lodash";

export function getMatchingTableRowsOrColumns(tableDataRowOrColumn) {
  return filter(
    filter(tableDataRowOrColumn, (tableDataCell) => tableDataCell.dataRowIds)
  );
}

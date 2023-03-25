import { filter, map } from "lodash";
import { getFilteredTableRows } from "./get-filtered-table-rows.helper";

export function getMergedTableRowsOrColumnsDetails(
  tableDataRowsOrColumns,
  dxGroupMembers
) {
  const availableParent = {};
  const mergedDataRowsOrColumnsArray = map(
    getFilteredTableRows(tableDataRowsOrColumns, dxGroupMembers),
    (filteredDataRow) =>
      filter(
        map(filteredDataRow, (filterDataCell) => {
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
        (dataCell) => dataCell
      )
  );

  return { availableParent, mergedDataRowsOrColumnsArray };
}

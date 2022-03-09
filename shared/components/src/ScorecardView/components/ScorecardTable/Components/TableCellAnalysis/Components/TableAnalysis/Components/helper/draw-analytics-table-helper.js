import { getHeaderColSpan } from "./get-header-col-span.helper";
import { getMergedTableColumns } from "./get-merged-table-columns.helper";
import { getMergedTableRows } from "./get-merged-table-rows.helper";
import { getTableDimensionItemsArray } from "./get-table-dimension-items-array.helper";
import { getTableHeaderRows } from "./get-table-header-rows.helper";
import { getTableRowsOrColumnsArray } from "./get-table-rows-or-columns-array.helper";
import { getTableRowsUpdatedWithColumnsMetadata } from "./get-table-rows-updated-with-columns-metadata.helper";
import { getTableSubtitle } from "./get-table-subtitle.helper";

export default function drawBnaTable(analyticsObject, tableConfiguration) {
  // const dataSelectionGroupMembers = getDataSelectionGroupMembers(
  //   tableConfiguration,
  // )

  // Get table rows

  const tableRowsArray = getTableRowsOrColumnsArray(
    getTableDimensionItemsArray(tableConfiguration.row, analyticsObject),
    "row"
  );

  // // Get table columns
  const tableColumnsArray = getMergedTableColumns(
    getTableRowsOrColumnsArray(
      getTableDimensionItemsArray(tableConfiguration.column, analyticsObject),
      "column"
    )
    // dataSelectionGroupMembers
  );

  const headers = getTableHeaderRows(
    tableRowsArray[0],
    tableColumnsArray,
    analyticsObject,
    tableConfiguration
  );

  return {
    title: tableConfiguration.title,
    subtitle: getTableSubtitle(tableConfiguration, analyticsObject),
    headers,
    headerColSpan: getHeaderColSpan(headers),
    rows: getMergedTableRows(
      getTableRowsUpdatedWithColumnsMetadata(
        tableConfiguration,
        tableRowsArray,
        tableColumnsArray
      )
      // dataSelectionGroupMembers
    ),
  };
}

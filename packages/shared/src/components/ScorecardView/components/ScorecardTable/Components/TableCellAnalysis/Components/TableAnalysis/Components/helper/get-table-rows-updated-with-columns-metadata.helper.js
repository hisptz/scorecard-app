import { map, last } from "lodash";

export function getTableRowsUpdatedWithColumnsMetadata(
  tableConfiguration,
  tableRowsArray,
  tableColumnsArray
) {
  return map(tableRowsArray, (tableRow) => {
    return [
      ...tableRow,
      ...map(last(tableColumnsArray), (tableDataCell) => {
        const lastTableRow = last(tableRow);
        const rowPaths =
          lastTableRow && lastTableRow.path ? lastTableRow.path.split("/") : [];
        const columnPaths =
          tableDataCell && tableDataCell.path
            ? tableDataCell.path.split("/")
            : [];

        const dataRowIds = [...rowPaths, ...columnPaths];
        return {
          id: dataRowIds.join("_"),
          isDataCell: true,
          dataDimensions: [
            ...tableConfiguration.row,
            ...tableConfiguration.column,
          ],
          dataRowIds,
        };
      }),
    ];
  });
}

import { each, map } from "lodash";

// eslint-disable-next-line max-params
export function getTableHeaderRows(
  tableRow,
  tableColumnsArray,
  analyticsObject,
  tableConfiguration
) {
  let tableHeaderRows = [];

  each(tableColumnsArray, (tableColumn, tableColumnIndex) => {
    const newTableColumn = map(
      tableColumn,
      (tableColumnCell, tableColumnCellIndex) => {
        const columnDimension = tableConfiguration.column[tableColumnCellIndex];
        return {
          ...tableColumnCell,
          dimension: columnDimension,
          name: tableColumnCell.name,
        };
      }
    );
    if (tableColumnIndex === 0) {
      tableHeaderRows = [
        ...tableHeaderRows,
        [
          ...map(tableRow, (tableRowCell, tableRowCellIndex) => {
            const rowDimension = tableConfiguration.row[tableRowCellIndex];
            return {
              ...tableRowCell,
              dimension: rowDimension,
              name: analyticsObject.metaData.names[rowDimension],
              rowSpan: tableColumnsArray.length,
            };
          }),
          ...newTableColumn,
        ],
      ];
    } else {
      tableHeaderRows = [...tableHeaderRows, newTableColumn];
    }
  });

  return tableHeaderRows;
}

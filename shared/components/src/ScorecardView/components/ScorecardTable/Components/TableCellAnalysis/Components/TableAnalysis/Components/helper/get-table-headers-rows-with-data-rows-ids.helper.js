import { map } from "lodash";

export default function getTableHeaderRowsWithDataRowIds(tableHeaderRowsArray) {
  return map(tableHeaderRowsArray, (tableHeaderRows) =>
    map(tableHeaderRows, (tableHeaderRow) => {
      if (!tableHeaderRow) {
        return null;
      }
      const dataRowIds = tableHeaderRow.path
        ? tableHeaderRow.path.split("/")
        : [];
      return dataRowIds.length > 1
        ? {
            ...tableHeaderRow,
            dataRowIds,
          }
        : tableHeaderRow;
    })
  );
}

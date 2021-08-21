import * as _ from 'lodash';


export  function getTableRowsUpdatedWithColumnsMetadata(
  tableConfiguration,
  tableRowsArray,
  tableColumnsArray
) {
  return _.map(tableRowsArray, (tableRow) => {
    return [
      ...tableRow,
      ..._.map(_.last(tableColumnsArray), (tableDataCell) => {
        const lastTableRow = _.last(tableRow);
        const rowPaths =
          lastTableRow && lastTableRow.path ? lastTableRow.path.split('/') : [];
        const columnPaths =
          tableDataCell && tableDataCell.path
            ? tableDataCell.path.split('/')
            : [];

        const dataRowIds = [...rowPaths, ...columnPaths];
        return {
          id: dataRowIds.join('_'),
          isDataCell: true,
          dataDimensions: [
            ...tableConfiguration.row,
            ...tableConfiguration.column
          ],
          dataRowIds
        };
      })
    ];
  });
}

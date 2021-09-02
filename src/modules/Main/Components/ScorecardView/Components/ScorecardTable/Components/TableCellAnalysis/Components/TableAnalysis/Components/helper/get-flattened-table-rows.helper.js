import {map,first,uniq,flatten,uniqBy,find,filter} from 'lodash';
export  function getFlattenedTableRows(tableDataRows) {
  let firstDataColumns = [];
  return map(tableDataRows, (tableRows) => {
    firstDataColumns = [...firstDataColumns, first(tableRows)];
    const dataPaths = uniq(
      flatten(
        map(tableRows, (tableCell) =>
          tableCell.path ? tableCell.path.split('/') : []
        )
      )
    );

    return uniqBy(
      [
        ... filter(
          map(dataPaths, (dataPath) =>
            find(firstDataColumns, ['id', dataPath])
          ),
          dataCell => dataCell
        ),
        ...tableRows
      ],
      'id'
    );
  });
}

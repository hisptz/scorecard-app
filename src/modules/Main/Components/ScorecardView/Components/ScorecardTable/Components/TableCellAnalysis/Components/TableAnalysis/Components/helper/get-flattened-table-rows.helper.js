import * as _ from 'lodash';
export  function getFlattenedTableRows(tableDataRows) {
  let firstDataColumns = [];
  return _.map(tableDataRows, (tableRows) => {
    firstDataColumns = [...firstDataColumns, _.first(tableRows)];
    const dataPaths = _.uniq(
      _.flatten(
        _.map(tableRows, (tableCell) =>
          tableCell.path ? tableCell.path.split('/') : []
        )
      )
    );

    return _.uniqBy(
      [
        ..._.filter(
          _.map(dataPaths, (dataPath) =>
            _.find(firstDataColumns, ['id', dataPath])
          ),
          dataCell => dataCell
        ),
        ...tableRows
      ],
      'id'
    );
  });
}

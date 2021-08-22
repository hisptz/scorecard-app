import * as _ from 'lodash';
export  function getMatchingTableRowsOrColumns(
  tableDataRowOrColumn,
  dxGroupMembers
) {
  return _.filter(
    _.filter(
      tableDataRowOrColumn,
      (tableDataCell) => tableDataCell.dataRowIds
    ),
    // (tableDataCell) =>
    //   _.some(
    //     dxGroupMembers,
    //     (dxGroupMember) =>
    //       _.intersection(tableDataCell.dataRowIds, dxGroupMember).length ===
    //       dxGroupMember.length
    //   )
  );
}

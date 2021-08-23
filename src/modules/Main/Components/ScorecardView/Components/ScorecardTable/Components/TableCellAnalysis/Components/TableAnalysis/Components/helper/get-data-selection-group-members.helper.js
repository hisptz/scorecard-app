import * as _ from 'lodash';

export  function getDataSelectionGroupMembers(
  tableConfiguration
) {
  const dxDataSelection = _.find(tableConfiguration.dataSelections, [
    'dimension',
    'dx'
  ]);

  return _.flatten(
    _.map(
      dxDataSelection ? dxDataSelection.groups || [] : [],
      (dxGroup) => {
        return _.map(dxGroup.members, (member) => [dxGroup.id, member.id]);
      }
    )
  );
}

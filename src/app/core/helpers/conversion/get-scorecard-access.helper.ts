import { ScorecardAccess } from '../../models/scorecard.model';

export function getScorecardAccess(accesses: any[]): ScorecardAccess[] {
  const scorecardAccesses: ScorecardAccess[] = [];
  if (accesses && accesses.length) {
    for (const access of accesses) {
      let newAccess: ScorecardAccess = { ...{}, id: '', access: '' };
      newAccess.id = access && access.id ? access.id : '';
      newAccess.access = generateAccessString(access);
      newAccess = { ...{}, ...newAccess };
      scorecardAccesses.push(newAccess);
    }
  }
  return scorecardAccesses;
}
function generateAccessString(access) {
  let str = '--------';
  if ((access && access.see && access.edit) || (access && access.edit)) {
    str = 'rw------';
  } else if (access && access.see) {
    str = 'r-------';
  } else {
    str = str;
  }
  return str;
}

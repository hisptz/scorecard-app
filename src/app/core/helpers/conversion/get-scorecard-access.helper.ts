
import { ScorecardAccess } from '../../models/scorecard.model';

export function getScorecardAccess(accesses: any[]) {
  const userGroupAccesses: ScorecardAccess[] = [];
  let publicAccess = '';
  if (accesses && accesses.length) {
    for (const access of accesses) {
      let newAccess: ScorecardAccess = { ...{}, id: '', access: '' };
      newAccess.id = access && access.id ? access.id : '';
      newAccess.access = generateAccessString(access);
      newAccess = { ...{}, ...newAccess };
      userGroupAccesses.push(newAccess);
      if(access && access.name && access.name === 'Public') {
        publicAccess = generateAccessString(access);
      }
    }
  }
  return {...{}, userGroupAccesses, publicAccess};
}
function generateAccessString(access): string {
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

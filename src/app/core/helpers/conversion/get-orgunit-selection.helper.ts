import { OrgUnitSelection } from '../../models/scorecard.model';

export function getOrgunitSelection(orgUnitData: any[]): OrgUnitSelection {
    const orgUnitSelections: OrgUnitSelection = { items: [] };
    if (orgUnitData && orgUnitData.length) {
      for (const orgUnit of orgUnitData) {
        let newOrgUnit = { id: '', name: '', type: '' };
        newOrgUnit.id = orgUnit && orgUnit.id ? orgUnit.id : '';
        newOrgUnit.name = orgUnit && orgUnit.name ? orgUnit.name : '';
        newOrgUnit.type = orgUnit && orgUnit.type ? orgUnit.type : '';
        newOrgUnit = { ...{}, ...newOrgUnit };
        orgUnitSelections.items.push(newOrgUnit);
      }
    }
    return orgUnitSelections;
}
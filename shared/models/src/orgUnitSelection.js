import DataModel from "./base";

export default class OrgUnitSelection extends DataModel {
  get defaults() {
    return {
      levels: [],
      groups: [],
      orgUnits: [],
      userSubX2Unit: false,
      userSubUnit: false,
      userOrgUnit: false,
    };
  }
}

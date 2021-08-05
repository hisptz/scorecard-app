import DataModel from "./base";

export default class OrgUnitSelection extends DataModel {

    get defaults() {
        return {
            level: '',
            group: '',
            orgUnits: [],
            userSubX2Unit: false,
            userSubUnit: false,
            userOrgUnit: false
        }
    }

}

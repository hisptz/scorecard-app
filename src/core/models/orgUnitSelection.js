import DataModel from "./base";

export default class OrgUnitSelection extends DataModel {

    get defaults() {
        return {
            level: '',
            group: '',
            orgUnitIds: [],
            userSubX2Unit: false,
            userSubUnit: false,
            userOrgUnit: false
        }
    }

}

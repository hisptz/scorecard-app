import DataModel from "./base";
import {ScorecardAccessType} from "../constants";

export default class ScorecardAccess extends DataModel {
    get defaults() {
        return {
            id: undefined,
            type: "userGroup",
            access: ScorecardAccessType.NO_ACCESS,
            displayName: "",
        };
    }
}

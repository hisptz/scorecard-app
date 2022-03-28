import {ScorecardAccessType} from "@hisptz/scorecard-constants";
import DataModel from "./base";

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

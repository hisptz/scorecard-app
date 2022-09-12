import {uid} from "@hisptz/scorecard-utils";
import DataModel from "./base";

export default class ScorecardLegend extends DataModel {
    get defaults() {
        return {
            id: uid(),
            legendDefinitionId: "",
            startValue: null,
            endValue: null,
        };
    }
}

import DataModel from "./base";
import {uid} from "../utils";

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

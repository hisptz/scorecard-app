import {uid} from "@hisptz/scorecard-utils";
import DataModel from "./base";

export default class ScorecardIndicator extends DataModel {
    get defaults() {
        return {
            id: uid(),
            type: "",
            label: "",
            name: "",
            weight: 100,
            effectiveGap: 5,
            displayArrows: true,
            highIsGood: true,
            showColors: true,
            legends: [],
            specificTargets: [],
            specificTargetsSet: false
        };
    }
}

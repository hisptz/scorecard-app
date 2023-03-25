import {uid} from "@scorecard/utils";
import DataModel from "./base";

export default class ScorecardIndicatorGroup extends DataModel {
    constructor(attributes) {
        super(attributes);
    }

    get defaults() {
        return {
            id: uid(),
            title: "",
            dataHolders: [],
            style: {
                backgroundColor: "#FFFFFF",
                color: "#000000",
            },
        };
    }
}

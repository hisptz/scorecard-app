import DataModel from "./base";
import ScorecardIndicator from "./scorecardIndicator";
import {uid} from "../utils";

export default class ScorecardIndicatorHolder extends DataModel {
    constructor(attributes) {
        super(attributes);
    }

    get defaults() {
        return {
            id: uid(),
            dataSources: [],
        };
    }

    static linkDataSource(
        holder = new ScorecardIndicatorHolder(),
        scorecardIndicator = new ScorecardIndicator()
    ) {
        return ScorecardIndicatorHolder.set(holder, "dataSources", [
            ...holder.dataSources,
            scorecardIndicator,
        ]);
    }
}

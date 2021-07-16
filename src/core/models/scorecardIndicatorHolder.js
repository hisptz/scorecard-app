import {uid} from "../../shared/utils/utils";
import DataModel from "./base";
import ScorecardIndicator from "./scorecardIndicator";

export default class ScorecardIndicatorHolder extends DataModel {
    get defaults() {
        return {
            id: uid(),
            dataSources: []
        }
    }

    constructor(attributes) {
        super(attributes);
        this.linkDataSource = this.linkDataSource.bind(this)
    }
    linkDataSource(scorecardIndicator = new ScorecardIndicator()) {
        return ScorecardIndicatorHolder.set(this, 'dataSources', [...this.dataSources, scorecardIndicator])
    }
}

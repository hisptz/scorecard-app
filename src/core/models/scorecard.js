import ScorecardAccessType from "../constants/scorecardAccessType";
import DataSelection from "./dataSelection";
import OrgUnitSelection from "./orgUnitSelection";
import PeriodSelection from "./periodSelection";
import ScorecardAccess from "./scorecardAccess";
import ScorecardLegend from "./scorecardLegend";
import ScorecardOption from "./scorecardOptions";

export default class Scorecard {
    constructor(scorecard) {
        this.scorecard = scorecard;
        if(scorecard && !scorecard.id) this.scorecard.id = this.uid();
    }

    get id() {
        return this.scorecard ? this.scorecard.id : undefined;
    }
    set id(value){
        this.scorecard.id = value;
    }

    get name() {
        return this.scorecard ? this.scorecard.name : undefined;
    }

    set name(value){
        this.scorecard.name = value
    }

    get title() {
        return this.scorecard ? this.scorecard.title : undefined;
    }

    get subtitle() {
        return this.scorecard ? this.scorecard.subtitle : undefined;
    }

    get description() {
        return this.scorecard ? this.scorecard.description : undefined;
    }

// TODO: Find ways to dynamically attach selected orgunit and period
    get customHeader() {
        return this.scorecard ? this.scorecard.customHeader : undefined;
    }

    get legendDefinitions() {
        return (this.scorecard ? this.scorecard.legendDefinitions : []).map(legend => new ScorecardLegend(legend));
    }

    get dataSelection() {
        return this.scorecard ? new DataSelection(this.scorecard.dataSelection) : null;
    }


    get orgUnitSelection() {
        return this.scorecard ? new OrgUnitSelection(this.scorecard.orgUnitSelection) : null;
    }

    get periodSelection() {
        return this.scorecard ? new PeriodSelection(this.scorecard.periodSelection) : null;
    }

    get options() {
        return this.scorecard ? new ScorecardOption(this.scorecard.options) : null;
    }

// TODO: Need to understand this, refer to scorecard user manual
    get highlightedIndicators() {
        return this.scorecard ? this.scorecard.highlightedIndicators : [];
    }

    get publicAccess() {
        return this.scorecard ? this.scorecard.publicAccess : ScorecardAccessType.NO_ACCESS;
    }

    get userGroupAccesses() {
        return (this.scorecard ? this.scorecard.userGroupAccesses : []).map(userGroupAccess => new ScorecardAccess(userGroupAccess));
    }

    get userAccesses() {
        return (this.scorecard ? this.scorecard.userAccesses : []).map(userAccess => new ScorecardAccess(userAccess));
    }

    get user() {
        return this.scorecard ? this.scorecard.user : null;
    }
}


import {SavableDataModel} from "./base";
import DataSelection from "./dataSelection";
import OrgUnitSelection from "./orgUnitSelection";
import PeriodSelection from "./periodSelection";
import ScorecardAccess from "./scorecardAccess";
import ScorecardOption from "./scorecardOptions";
import {uid} from "../utils";

export default class Scorecard extends SavableDataModel {
    get defaults() {
        return {
            id: uid(),
            name: "",
            title: "",
            subtitle: "",
            description: "",
            customHeader: "",
            periodType: "",
            legendDefinitions: [],
            dataSelection: new DataSelection(),
            orgUnitSelection: new OrgUnitSelection(),
            periodSelection: new PeriodSelection(),
            options: new ScorecardOption(),
            highlightedIndicators: [],
            publicAccess: new ScorecardAccess(),
            userGroupAccesses: [],
            userAccesses: [],
            user: {},
            targetOnLevels: false,
            additionalLabels: [],
        };
    }
}

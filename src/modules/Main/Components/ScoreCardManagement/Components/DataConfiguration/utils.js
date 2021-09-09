import {find} from 'lodash'
import ScorecardIndicatorGroup from "../../../../../../core/models/scorecardIndicatorGroup";

export function generateNewGroupData(groups) {

    return new ScorecardIndicatorGroup({
        title: `Group ${groups?.length + 1 || 1}`,
    })
}




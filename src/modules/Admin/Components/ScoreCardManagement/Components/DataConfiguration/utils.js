import {find} from 'lodash'
import ScorecardIndicatorGroup from "../../../../../../core/models/scorecardIndicatorGroup";

export function generateNewGroupData(groups) {

    return new ScorecardIndicatorGroup({
        title: `Group ${groups?.length + 1 || 1}`,
    })
}


export function getLegend(value, legends) {
    console.log(legends)
    return find(legends, ({startValue: min, endValue: max}) => parseInt(min) < value && parseInt(max) >= value)
}

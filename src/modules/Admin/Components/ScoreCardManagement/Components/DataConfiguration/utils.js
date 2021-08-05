import {find} from 'lodash'
import ScorecardIndicatorGroup from "../../../../../../core/models/scorecardIndicatorGroup";

export function generateNewGroupData(groups) {

    return new ScorecardIndicatorGroup({
        title: `Group ${groups?.length + 1 || 1}`,
    })
}

export function getLegend(value, legends) {
    return find(legends, (legend) => {
        if (legend) {
            const {startValue, endValue} = legend;
            return +startValue <= value && +endValue > value
        }
        return false;
    });
}



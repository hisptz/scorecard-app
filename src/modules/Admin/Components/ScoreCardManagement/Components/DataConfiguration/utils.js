import {find} from 'lodash'
import ScorecardIndicatorGroup from "../../../../../../core/models/scorecardIndicatorGroup";
import ScorecardLegend from "../../../../../../core/models/scorecardLegend";

export function generateNewGroupData(groups) {

    return new ScorecardIndicatorGroup({
        title: `Group ${groups?.length + 1 || 1}`,
    })
}

export function getLegend(value, legends) {
    return find(legends, (legend) => {
        if (legend) {
            const {startValue, endValue} = legend;
            console.log(startValue)
            return +startValue <= value && +endValue > value
        }
        return false;
    });
}

export function generateLegendDefaults(legendDefinition = [], weight) {
    if (legendDefinition) {
        const actualWeight = weight ?? 100; //sets 100 as the default weight
        const range = actualWeight / legendDefinition?.length
        const values = []
        let legendDefinitionIterator = legendDefinition.length - 1;
        for (let i = 0; i < actualWeight; i += range) {
            const {id, color, name} = legendDefinition[legendDefinitionIterator];
            values.push(new ScorecardLegend({
                startValue: `${Math.floor(i)}`,
                endValue: `${Math.floor(i + range)}`,
                id,
                color,
                name
            }))
            legendDefinitionIterator--
        }
        return values.reverse();
    }
    return []
}


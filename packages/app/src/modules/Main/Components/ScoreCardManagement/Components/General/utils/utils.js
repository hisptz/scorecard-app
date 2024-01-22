import {getScorecardSummary} from "@scorecard/shared";
import {generateLegendDefaults} from "@scorecard/shared";
import {cloneDeep, find, isEmpty, set} from "lodash";

export function resetLegends(groups, legendDefinitions) {
    const newGroups = cloneDeep(groups);
    if (newGroups) {
        newGroups?.forEach(group => {
            group?.dataHolders?.forEach(dataHolder => {
                dataHolder?.dataSources?.forEach(dataSource => {
                    set(dataSource, "legends", generateLegendDefaults(getNonDefaultLegendDefinitions(legendDefinitions)));
                    if (!isEmpty(dataSource.specificTargets)) {
                        dataSource.specificTargets.forEach(specificTarget => {
                            set(specificTarget, "legends", generateLegendDefaults(getNonDefaultLegendDefinitions(legendDefinitions)));
                        });
                    }
                });
            })
        });
    }
    return newGroups;
}


export function getNonDefaultLegendDefinitions(legendDefinitions) {
    return legendDefinitions?.filter(legendDefinition => !legendDefinition.isDefault) ?? [];
}

export function getDefaultLegendDefinitions(legendDefinitions) {
    return legendDefinitions?.filter(legendDefinition => legendDefinition.isDefault) ?? [];
}


export async function titleDoesNotExist(engine, id, title) {
    const {summary} = await getScorecardSummary(engine);
    if (isEmpty(summary)) {
        return true;
    }
    const scorecard = find(summary, {title});
    if (scorecard) {
        return scorecard.id === id;
    }
    return !scorecard;
}

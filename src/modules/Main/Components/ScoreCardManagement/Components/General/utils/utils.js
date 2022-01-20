import {cloneDeep, set} from "lodash";
import {generateLegendDefaults} from "../../../../../../../shared/utils/utils";

export function resetLegends(setGroups, legendDefinitions) {
    setGroups(prevGroups => {
        const newGroups = cloneDeep(prevGroups);
        newGroups.forEach(group => {
            group.dataHolders.forEach(dataHolder => {
                dataHolder.dataSources.forEach(dataSource => {
                    set(dataSource, "legends", generateLegendDefaults(getNonDefaultLegendDefinitions(legendDefinitions)));
                });
            })
        });
        return newGroups;
    })
}


export function getNonDefaultLegendDefinitions(legendDefinitions) {
    return legendDefinitions.filter(legendDefinition => legendDefinition.isDefault !== true);
}

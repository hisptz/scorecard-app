import {cloneDeep, set} from "lodash";
import {generateLegendDefaults} from "../../../../../../../shared/utils/utils";

export function resetLegends(setValue, groups, legendDefinitions) {
    const newGroups = cloneDeep(groups);
    if (newGroups) {
        newGroups?.forEach(group => {
            group?.dataHolders?.forEach(dataHolder => {
                dataHolder?.dataSources?.forEach(dataSource => {
                    set(dataSource, "legends", generateLegendDefaults(getNonDefaultLegendDefinitions(legendDefinitions)));
                });
            })
        });
        setValue("dataSelection.dataGroups", newGroups);
    }
}


export function getNonDefaultLegendDefinitions(legendDefinitions) {
    return legendDefinitions?.filter(legendDefinition => !legendDefinition.isDefault) ?? [];
}

export function getDefaultLegendDefinitions(legendDefinitions) {
    return legendDefinitions?.filter(legendDefinition => legendDefinition.isDefault) ?? [];
}

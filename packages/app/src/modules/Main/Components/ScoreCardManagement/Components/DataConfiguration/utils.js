import {ScorecardIndicatorGroup} from "@scorecard/shared";
import {generateLegendDefaults} from "@scorecard/shared";
import {fromPairs, set} from "lodash";

export function generateNewGroupData(groups) {
    return new ScorecardIndicatorGroup({
        title: `Group ${groups?.length + 1 || 1}`,
    });
}

export function updateLegendsOnDataGroups(
    dataGroups,
    {targetOnLevels, filteredLegendDefinitions, orgUnitLevels}
) {
    const newValue = targetOnLevels
        ? fromPairs([
            ...orgUnitLevels?.map(({id}) => [
                id,
                generateLegendDefaults(filteredLegendDefinitions, 100, true),
            ]),
        ])
        : generateLegendDefaults(filteredLegendDefinitions, 100, true);

    let updatedGroups = [...dataGroups];

    for (const groupIndex in updatedGroups) {
        for (const holderIndex in updatedGroups[groupIndex]?.dataHolders) {
            for (const sourceIndex in updatedGroups[groupIndex]?.dataHolders?.[
                holderIndex
                ]?.dataSources) {
                updatedGroups = set(
                    updatedGroups,
                    [
                        groupIndex,
                        "dataHolders",
                        holderIndex,
                        "dataSources",
                        sourceIndex,
                        "legends",
                    ],
                    newValue
                );
            }
        }
    }
    return updatedGroups;
}

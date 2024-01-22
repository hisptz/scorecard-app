import {OrgUnitLevels, ScorecardConfigDirtySelector, ScorecardConfigDirtyState} from "@scorecard/shared";
import {filter, isEmpty} from "lodash";
import {useEffect} from "react";
import {useRecoilCallback, useRecoilValue, waitForAll} from "recoil";
import {updateLegendsOnDataGroups} from "../utils";

export default function useSetDefaults() {
    const targetOnLevels = useRecoilValue(
        ScorecardConfigDirtyState("targetOnLevels")
    );

    const resetLegends = useRecoilCallback(({snapshot, set}) => () => {
        const {dataGroups, orgUnitLevels, legendDefinitions} =
            snapshot.getLoadable(
                waitForAll({
                    dataGroups: ScorecardConfigDirtySelector({
                        key: "dataSelection",
                        path: "dataGroups",
                    }),
                    orgUnitLevels: OrgUnitLevels,
                    legendDefinitions: ScorecardConfigDirtyState("legendDefinitions"),
                })
            ).contents;
        const filteredLegendDefinitions = filter(
            legendDefinitions,
            ({isDefault}) => !isDefault
        );
        if (!isEmpty(dataGroups)) {
            const updatedGroups = updateLegendsOnDataGroups(dataGroups, {
                targetOnLevels,
                filteredLegendDefinitions,
                orgUnitLevels,
            });

            set(
                ScorecardConfigDirtySelector({
                    key: "dataSelection",
                    path: "dataGroups",
                }),
                updatedGroups
            );
        }
    });

    useEffect(() => {
        resetLegends();
    }, [targetOnLevels]);
}

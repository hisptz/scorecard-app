import {useDataEngine} from "@dhis2/app-runtime";
import {useSetting} from "@dhis2/app-service-datastore";
import {DATA_MIGRATION_CHECK} from "@scorecard/shared";
import clone, {filter, compact, isEmpty, flattenDeep} from "lodash";
import {useCallback, useEffect, useState} from "react";
import {
    getOldScorecardKeys,
    getScorecardKeys,
    getOldScorecardWidgets,
    uploadNewScorecardWidget
} from "../services/migrate.js";
import useQueue from "./useQueue.js";



export default function useMigrateScorecardWidget(onComplete) {
    const [error, setError] = useState();
    const engine = useDataEngine();
    const [, {set: setSkipMigration}] = useSetting(DATA_MIGRATION_CHECK, {global: true});
    const migrate = useCallback(
        async (scorecard) => {
            await uploadNewScorecardWidget({newScorecardWidget: scorecard, engine})
        },
        [engine],
    );

    const {add, progress, length, started} = useQueue({
        drain: [],
        task: migrate
    })


    const onMigrationInitiated = useCallback(async () => {
        try {
            const newDashboardKeys = await getScorecardKeys(engine);
            const oldScorecardKeys = await getOldScorecardKeys(engine);
            const oldDashboardKeys = clone(oldScorecardKeys);
            const filteredKeys = filter(oldDashboardKeys,(oldDashboardItemId)=>{
                return !newDashboardKeys.includes(oldDashboardItemId)
           });
           const filteredNewKeys = filter(flattenDeep(filteredKeys),(oldDashboardItemId)=>{
            return !newDashboardKeys.includes(oldDashboardItemId) && typeof(oldDashboardItemId) === "string"
       });
            if (filteredNewKeys && !isEmpty(filteredNewKeys)) {
                const oldScorecardWidgets = compact(await getOldScorecardWidgets(engine, filteredNewKeys));
                for (const scorecardWidget of oldScorecardWidgets) {
                    add(scorecardWidget)
                }
            } else {
                onComplete();
                setSkipMigration(true)
            }
        } catch (e) {
            setError(e);
            setSkipMigration(true);
            onComplete();
        }
    }, [add,engine, onComplete, setSkipMigration])

    useEffect(() => {
        onMigrationInitiated();
    }, [onMigrationInitiated]);

    return {
        progress,
        count: progress + length ,
        error,
        migrationStarted: started
    };
}

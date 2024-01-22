import {useSetting} from "@dhis2/app-service-datastore";
import {DATA_MIGRATION_CHECK} from "@scorecard/shared";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export function useAutoMigration() {
    const [skipMigration] = useSetting(DATA_MIGRATION_CHECK, {global: true});
    const history = useHistory();

    useEffect(() => {
        if (!skipMigration) {
            history.replace("/migrate");
        }
    }, [history, skipMigration]);
}

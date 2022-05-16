import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {CircularLoader, LinearLoader} from "@dhis2/ui";
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import useMigrateScorecardWidget from "./hooks/useMigrateScorecard";

export default function ScorecardWidgetMigration() {
    const history = useHistory();
    const onComplete = () => {
        history.replace("/");
    };

    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const {error, progress, count, migrationStarted} = useMigrateScorecardWidget(onComplete);
    useEffect(() => {
        if (error) {
            show({
                message: i18n.t("Error Migrating Scorecards Widgets: " + (error?.message ?? "")),
                type: {info: true},
            });
        }
    }, [error, show]);

    if (!migrationStarted) {
        return (
            <div className="column center align-items-center h-100 w-100">
                <CircularLoader small/>
                <h4>{i18n.t("Preparing widgets migration...")}</h4>
            </div>
        );
    }

    return (
        <div className="column center align-items-center h-100 w-100">
            <LinearLoader amount={(progress / count) * 100}/>
            <h4>
                {i18n.t("Migrating scorecards widgets")}...{+progress} {i18n.t("of")} {+count}
            </h4>
        </div>
    );
}


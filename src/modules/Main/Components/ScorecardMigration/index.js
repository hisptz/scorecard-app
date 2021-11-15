import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {CircularLoader, LinearLoader} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import useMigrateScorecard from "./hooks/useMigrateScorecard";

export default function ScorecardMigration({onMigrationComplete}) {
    const onComplete = () => {
        onMigrationComplete(true);
    };

    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const {loading, error, progress, count} = useMigrateScorecard(onComplete);

    useEffect(() => {
        if (error) {
            show({
                message: i18n.t("Error Migrating Scorecards: " + (error?.message ?? "")),
                type: {info: true},
            });
        }
    }, [error, show]);

    if (loading) {
        return (
            <div className="column center align-items-center h-100 w-100">
                <CircularLoader/>
            </div>
        );
    }

    return (
        <div className="column center align-items-center h-100 w-100">
            <LinearLoader amount={(progress / count) * 100}/>
            <h4>
                {i18n.t("Migrating scorecards")}...{+progress} {i18n.t("of")} {+count}
            </h4>
        </div>
    );
}

ScorecardMigration.propTypes = {
    onMigrationComplete: PropTypes.func.isRequired,
};

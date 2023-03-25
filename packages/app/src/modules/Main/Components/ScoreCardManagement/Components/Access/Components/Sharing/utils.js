import i18n from "@dhis2/d2-i18n";
import {ScorecardAccessType} from "@scorecard/shared";
import UserGroupIcon from "@material-ui/icons/People";
import UserIcon from "@material-ui/icons/Person";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";

export function getAccessName(access = "") {
    switch (access) {
        case ScorecardAccessType.NO_ACCESS:
            return i18n.t("No Access");
        case ScorecardAccessType.READ_ONLY:
            return i18n.t("Can Read");
        case ScorecardAccessType.READ_WRITE:
            return i18n.t("Can Read and Write");
    }
}

export function getAccessIcon(type = "") {
    switch (type) {
        case "public":
            return <PublicIcon/>;
        case "user":
            return <UserIcon/>;
        case "userGroup":
            return <UserGroupIcon/>;
    }
}

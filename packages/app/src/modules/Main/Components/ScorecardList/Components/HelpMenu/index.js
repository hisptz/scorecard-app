import i18n from "@dhis2/d2-i18n";
import {FlyoutMenu, MenuItem} from "@dhis2/ui";
import {SCORECARD_DOCUMENTATION_URL} from "@scorecard/shared";
import {HelpState} from "@scorecard/shared";
import React from "react";
import {useSetRecoilState} from "recoil";

export default function HelpMenu() {
    const setHelpEnabled = useSetRecoilState(HelpState);
    const onTour = () => {
        setHelpEnabled(true);
    };

    const onDocs = () => {
        const docsPage = window.open();
        docsPage.opener = null;
        docsPage.target = "_blank";
        docsPage.location = SCORECARD_DOCUMENTATION_URL;
    };

    return (
        <FlyoutMenu>
            <MenuItem onClick={onTour} label={i18n.t("Start a guided tour")}/>
            <MenuItem onClick={onDocs} label={i18n.t("Documentation")}/>
        </FlyoutMenu>
    );
}

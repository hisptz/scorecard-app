import i18n from "@dhis2/d2-i18n";
import { FlyoutMenu, MenuItem } from "@dhis2/ui";
import { HelpState, SCORECARD_DOCUMENTATION_URL } from "../../../../shared";
import React from "react";
import { useSetRecoilState } from "recoil";

export default function HelpMenu() {
	const setHelpEnabled = useSetRecoilState(HelpState);
	const onTour = () => {
		setHelpEnabled(true);
	};

	const onDocs = () => {
		window.open(SCORECARD_DOCUMENTATION_URL, "_blank");
	};

	return (
		<FlyoutMenu>
			<MenuItem onClick={onTour} label={i18n.t("Start a guided tour")} />
			<MenuItem onClick={onDocs} label={i18n.t("Documentation")} />
		</FlyoutMenu>
	);
}

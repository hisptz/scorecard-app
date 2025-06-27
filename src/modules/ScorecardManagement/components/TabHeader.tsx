import { useLocation } from "react-router-dom";
import { getStep } from "../constants/steps";
import { Button, IconQuestion24 } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import { Help } from "../../../shared";


export function TabHeader() {
	const location = useLocation();
	const activeTabId = location.pathname.split("/").pop();
	const step = getStep(activeTabId!);

	return (
		<div className="row space-between align-items-center">
			<Help helpSteps={step?.helpSteps ?? []} />
			<h2>{step?.label ?? ""}</h2>
			<Button icon={<IconQuestion24 />}>{i18n.t("Help")}</Button>
		</div>
	);
}

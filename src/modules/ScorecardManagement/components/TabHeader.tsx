import { useLocation } from "react-router-dom";
import { getStep } from "../constants/steps";
import { Button, IconQuestion24 } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { Help } from "../../../shared";

export function TabHeader() {
	const location = useLocation();
	const activeTabId = location.pathname.split("/").pop();
	const step = getStep(activeTabId!);

	return (
		<div className="flex gap- 16 space-between items-center pt-8 pb-8">
			<Help helpSteps={step?.helpSteps ?? []} />
			<h2 className="text-2xl font-bold">{step?.label ?? ""}</h2>
			<Button icon={<IconQuestion24 />}>{i18n.t("Help")}</Button>
		</div>
	);
}

import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";

export function ScorecardOptionsControlButton() {
	return (
		<>
			<Button>{i18n.t("Options")}</Button>
		</>
	);
}

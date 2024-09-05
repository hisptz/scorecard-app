import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { useBoolean } from "usehooks-ts";
import { ScorecardOptionsModal } from "./ScorecardOptionsModal";

export function ScorecardOptionsControlButton() {
	const {
		value: hide,
		setTrue: onClose,
		setFalse: onShow,
	} = useBoolean(true);

	return (
		<>
			{!hide && <ScorecardOptionsModal hide={hide} onClose={onClose} />}
			<Button onClick={onShow}>{i18n.t("Options")}</Button>
		</>
	);
}

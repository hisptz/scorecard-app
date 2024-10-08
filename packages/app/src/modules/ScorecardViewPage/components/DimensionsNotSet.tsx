import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";

export function DimensionsNotSet() {


	return (
		<div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

			<h1 style={{ color: colors.grey600 }}>{i18n.t("Select organisation unit(s) and period(s) to start")}</h1>
		</div>
	);
}

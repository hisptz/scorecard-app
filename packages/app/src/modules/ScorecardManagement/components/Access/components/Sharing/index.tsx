import React from "react";
import "./sharing.css";
import i18n from "@dhis2/d2-i18n";
import { SharingDialog } from "./components/CustomSharingDialog/SharingDialog";
import { colors, IconError24 } from "@dhis2/ui";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useController } from "react-hook-form";

export default function Sharing() {
	const { fieldState, field } = useController<ScorecardConfig, "sharing">({
		name: "sharing"
	});


	console.log({
		sharing: field.value
	});

	return (
		<div style={{ gap: 16 }} className="column h-100">
			<div className="pt-16 pb-16">
				<h3>{i18n.t("Sharing")}</h3>
			</div>
			{fieldState.error && (
				<div
					style={{
						display: "flex",
						gap: 8,
						alignItems: "center",
						padding: "8px 0",
						color: colors.red500
					}}
				>
					<IconError24 />
					{fieldState.error?.message}
				</div>
			)}
			<SharingDialog />
		</div>
	);
}



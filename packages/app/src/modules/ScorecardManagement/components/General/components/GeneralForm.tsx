import i18n from "@dhis2/d2-i18n";
import { RHFDHIS2FormField as RHFCustomInput, RHFTextInputField } from "@hisptz/dhis2-ui";
import React from "react";
import "../../../ScorecardManagement.module.css";
import { PeriodSelector } from "./PeriodSelector";
import LegendDefinitionFormField from "./LegendDefinitionFormField";
import { PeriodTypeSelector } from "./PeriodTypeSelector";
import { AdditionalLabelsField } from "./AdditionalLabelsField";

export default function GeneralForm() {

	return (
		<div
			style={{ gap: 16, display: "flex", flexDirection: "column" }}
		>
			<div
				style={{ display: "flex", flexDirection: "column", gap: 16 }}
				className="col-12 general-settings"
			>
				<RHFTextInputField
					name="title"
					label={i18n.t("Title")}
					required
				/>
				<RHFTextInputField
					valueType="TEXT"
					name="subtitle"
					label={i18n.t("Subtitle")}
					max="120"
				/>
			</div>
			<div className="description-settings">
				<RHFCustomInput
					name="description"
					valueType="LONG_TEXT"
					label={i18n.t("Description")}
				/>
			</div>
			<div className="row align-items-center" style={{ gap: 24 }}>
				<PeriodTypeSelector />
				<PeriodSelector />
			</div>
			<div className="custom-header-settings">
				<RHFCustomInput
					name="customHeader"
					label={i18n.t("Custom Header")}
					valueType="RICH_TEXT"
				/>
			</div>
			<div className="col-sm-6 col-xl-4 legend-definitions-settings gap-8">
				<LegendDefinitionFormField />
			</div>
			<div className="col-sm-6 col-xl-4 additional-labels-settings">
				<AdditionalLabelsField />
			</div>
		</div>
	);
}

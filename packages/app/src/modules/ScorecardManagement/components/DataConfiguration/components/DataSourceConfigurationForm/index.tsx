import i18n from "@dhis2/d2-i18n";
import { Divider } from "@dhis2/ui";
import { RHFCheckboxField, RHFTextInputField } from "@hisptz/dhis2-ui";
import { DHIS2ValueTypes } from "@scorecard/shared";
import React from "react";
import TargetsArea from "../DataGroups/components/DataSourceConfiguration/components/TargetsArea";

export default function DataSourceConfigurationForm({ path }: { path: string }) {

	return (
		<div className="container p-16 data-source-form-container">
			<div style={{ gap: 16 }} className="column">
				<RHFTextInputField
					disabled
					required
					valueType={DHIS2ValueTypes.TEXT.name}
					label={i18n.t("Name")}
					name={`${path}.name`}
				/>
				<RHFTextInputField
					required
					valueType={DHIS2ValueTypes.TEXT.name}
					label={i18n.t("Label")}
					name={`${path}.label`}
					validations={{
						required: i18n.t("Label is required")
					}}
				/>
				<RHFTextInputField
					required
					type="number"
					valueType={DHIS2ValueTypes.NUMBER.name}
					label={i18n.t("Weight")}
					name={`${path}.weight`}
				/>
				<div className="row space-between">
					<div className="column pr-16 effective-gap-settings">
						<RHFTextInputField
							valueType={DHIS2ValueTypes.NUMBER.name}
							type="number"
							label={i18n.t("Effective Gap")}
							name={`${path}.effectiveGap`}
						/>
					</div>
					<div className="column pl-16 indicator-options-settings-area">
						<RHFCheckboxField
							renderAsCheckbox
							valueType="BOOLEAN"
							label={i18n.t("Display Arrows")}
							name={`${path}.displayArrows`}
						/>
						<RHFCheckboxField
							renderAsCheckbox
							valueType="BOOLEAN"
							label={i18n.t("High is Good")}
							name={`${path}.highIsGood`}
						/>
						<RHFCheckboxField
							renderAsCheckbox
							valueType="BOOLEAN"
							label={i18n.t("Show Colors")}
							name={`${path}.showColors`}
						/>
					</div>
				</div>
				<Divider />
				<TargetsArea path={path} />
			</div>
		</div>
	);
}

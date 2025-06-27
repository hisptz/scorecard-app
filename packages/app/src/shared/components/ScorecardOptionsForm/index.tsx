import i18n from "@dhis2/d2-i18n";
import React from "react";
import Help from "../Help";
import { AverageDisplayType, OPTIONS_HELP_STEPS } from "../../constants";
import { RHFCheckboxField, RHFRadioField } from "@hisptz/dhis2-ui";

export default function ScorecardOptionsForm() {
	return (
		<div className="container p-16">
			<Help helpSteps={OPTIONS_HELP_STEPS} />
			<div className="row">
				<div className="column">
					<h3>{i18n.t("Visibility")}</h3>
					<div className="column visibility-options">
						<RHFCheckboxField
							name="options.legend"
							label={i18n.t("Legend")}
						/>
						<RHFCheckboxField
							name="options.title"
							label={i18n.t("Title")}
						/>
						<RHFCheckboxField
							name="options.itemNumber"
							label={i18n.t("Item Number")}
						/>
						<RHFCheckboxField
							name="options.emptyRows"
							label={i18n.t("Empty Rows")}
						/>
						<RHFCheckboxField
							name="options.showHierarchy"
							label={i18n.t("Show Hierarchy")}
						/>
						<RHFCheckboxField
							name="options.averageColumn"
							label={i18n.t("Average Column")}
						/>
						<RHFCheckboxField
							name="options.averageRow"
							label={i18n.t("Average Row")}
						/>
						<RHFCheckboxField
							name="options.highlightedIndicators"
							label={i18n.t("Highlighted Indicators")}
						/>
					</div>
					<h3>{i18n.t("Average")}</h3>
					<div className="options.average-options">
						<RHFRadioField
							name="options.averageDisplayType"
							radioValue={AverageDisplayType.ALL}
							label={i18n.t("All")}
						/>
						<RHFRadioField
							name="options.averageDisplayType"
							radioValue={AverageDisplayType.BELOW_AVERAGE}
							label={i18n.t("Below Average")}
						/>
						<RHFRadioField
							name="options.averageDisplayType"
							radioValue={AverageDisplayType.ABOVE_AVERAGE}
							label={i18n.t("Above Average")}
						/>
					</div>
					<h3>{i18n.t("Options")}</h3>
					<div className=" other-options">
						<RHFCheckboxField
							name="options.arrows"
							label={i18n.t("Arrows")}
						/>
						<RHFCheckboxField
							name="options.showDataInRows"
							label={i18n.t("Show Data in Rows")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}


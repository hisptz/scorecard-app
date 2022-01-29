import i18n from "@dhis2/d2-i18n";
import {RHFCustomInput} from "@hisptz/react-ui";
import React from "react";
import {DHIS2ValueTypes} from "../../../../../../../shared/Components/CustomForm/constants";
import "../../../ScorecardManagement.module.css";
import LegendDefinitionFormField from "./LegendDefinitionFormField";
import PeriodSelector from "./PeriodSelector";
import PeriodTypeSelector from "./PeriodTypeSelector";


export default function GeneralForm() {
    return (
        <div className="col-12">
            <div className="col-12 general-settings">
                <RHFCustomInput
                    valueType={DHIS2ValueTypes.TEXT.name}
                    name="title"
                    label={i18n.t("Title")}
                    mandatory
                    validations={{
                        required: i18n.t("Title is required")
                    }}
                />
                <RHFCustomInput
                    valueType={DHIS2ValueTypes.TEXT.name}
                    name="subtitle"
                    label={i18n.t("Subtitle")}
                    max="120"
                />
            </div>
            <div className="description-settings">
                <RHFCustomInput
                    name="description"
                    valueType={DHIS2ValueTypes.LONG_TEXT.name}
                    label={i18n.t("Description")}
                />
            </div>
            <div className="row align-items-center" style={{gap: 24}}>
                <div className="col-md-4 period-type-settings">
                    <PeriodTypeSelector
                        label={i18n.t("Period Type")}
                        name="periodType"
                    />
                </div>
                <div className="flex-1 period-settings">
                    <PeriodSelector/>
                </div>
            </div>
            <div className="custom-header-settings">
                <RHFCustomInput
                    name="customHeader"
                    label={i18n.t("Custom Header")}
                    valueType={DHIS2ValueTypes.RICH_TEXT.name}
                />
            </div>
            <div className="col-sm-6 col-xl-4 legend-definitions-settings">
                <LegendDefinitionFormField
                    field={
                        {
                            valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                            multipleField: {
                                name: "legendDefinition",
                                valueType: DHIS2ValueTypes.LEGEND_DEFINITION.name
                            },
                            label: i18n.t("Legend Definitions")
                        }
                    }
                />
            </div>
            <div className="col-sm-6 col-xl-4 additional-labels-settings">
                <RHFCustomInput
                    addable
                    deletable
                    name="additionalLabels"
                    valueType={DHIS2ValueTypes.MULTIPLE_FIELDS.name}
                    label={i18n.t("Additional Labels (Tags)")}
                    multipleField={{
                        name: "label",
                        valueType: DHIS2ValueTypes.TEXT.name
                    }}
                />
            </div>
        </div>
    );
}

GeneralForm.propTypes = {};

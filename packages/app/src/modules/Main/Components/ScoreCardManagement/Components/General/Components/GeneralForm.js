import {useDataEngine} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {RHFDHIS2FormField as RHFCustomInput} from "@hisptz/dhis2-ui";
import {DHIS2ValueTypes} from "@scorecard/shared";
import React from "react";
import {useParams} from "react-router-dom";
import "../../../ScorecardManagement.module.css";
import {titleDoesNotExist} from "../utils/utils";
import LegendDefinitionFormField from "./LegendDefinitionFormField";
import PeriodSelector from "./PeriodSelector";
import PeriodTypeSelector from "./PeriodTypeSelector";


export default function GeneralForm() {
    const {id} = useParams();
    const engine = useDataEngine()
    return (<div style={{gap: 16, display: "flex", flexDirection: "column"}} className="col-12">
        <div style={{display: "flex", flexDirection: "column", gap: 16}} className="col-12 general-settings">
            <RHFCustomInput
                valueType={DHIS2ValueTypes.TEXT.name}
                name="title"
                label={i18n.t("Title")}
                required
                validations={{
                    required: i18n.t("Title is required"), validate: async (value) => {
                        return await titleDoesNotExist(engine, id, value) || i18n.t(`A scorecard with the title '{{value}}' already exists. Please select another title`, {value})
                    }
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
            <div className="flex-1 period-settings w-100">
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
        <div className="col-sm-6 col-xl-4 legend-definitions-settings gap-8">
            <LegendDefinitionFormField/>
        </div>
        <div className="col-sm-6 col-xl-4 additional-labels-settings">
            <RHFCustomInput
                addable
                deletable
                name="additionalLabels"
                valueType={DHIS2ValueTypes.MULTIPLE_FIELDS.name}
                label={i18n.t("Additional Labels (Tags)")}
                multipleField={{
                    name: "label", valueType: DHIS2ValueTypes.TEXT.name
                }}
            />
        </div>
    </div>);
}

GeneralForm.propTypes = {};

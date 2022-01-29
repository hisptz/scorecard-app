import i18n from "@dhis2/d2-i18n";
import {Divider} from "@dhis2/ui";
import {RHFCustomInput} from "@hisptz/react-ui";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {
    getNonDefaultLegendDefinitions
} from "../../../../../modules/Main/Components/ScoreCardManagement/Components/General/utils/utils";
import {DHIS2ValueTypes} from "../../constants";
import {FormFieldModel} from "../../models";
import TargetsField from "./Components/TargetsField";

export default function DataSourceConfigurationForm({path}) {
    const {watch, getValues, setValue} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"))

    useEffect(() => {
       if(path){
           setValue(path, getValues(path))
       }
    }, [getValues, path, setValue]);

    return (
        <div className="container p-16 data-source-form-container">
            <div className="column">
                <RHFCustomInput
                    disabled
                    mandatory
                    valueType={DHIS2ValueTypes.TEXT.name}
                    label={i18n.t("Name")}
                    name={`${path}.displayName`}
                />
                <RHFCustomInput
                    mandatory
                    valueType={DHIS2ValueTypes.TEXT.name}
                    label={i18n.t("Label")}
                    name={`${path}.label`}
                    validations={{
                        required: i18n.t("Label is required")
                    }}
                />
                <RHFCustomInput
                    valueType={DHIS2ValueTypes.NUMBER.name}
                    label={i18n.t("Weight")}
                    name={`${path}.weight`}
                />
                <div className="row space-between">
                    <div className="column pr-16 effective-gap-settings">
                        <RHFCustomInput
                            valueType={DHIS2ValueTypes.NUMBER.name}
                            label={i18n.t("Effective Gap")}
                            name={`${path}.effectiveGap`}
                        />
                    </div>
                    <div className="column pl-16 indicator-options-settings-area">
                        <RHFCustomInput
                            valueType={DHIS2ValueTypes.TRUE_ONLY.name}
                            label={i18n.t("Display Arrows")}
                            name={`${path}.displayArrows`}
                        />
                        <RHFCustomInput
                            valueType={DHIS2ValueTypes.TRUE_ONLY.name}
                            label={i18n.t("High is Good")}
                            name={`${path}.highIsGood`}
                        />
                        <RHFCustomInput
                            valueType={DHIS2ValueTypes.TRUE_ONLY.name}
                            label={i18n.t("Show Colors")}
                            name={`${path}.showColors`}
                        />
                    </div>
                </div>
                <Divider/>
                <div className="row">
                    <div className="column w-100 legend-settings-area">
                        <TargetsField
                            name={`${path}.legends`}
                            multipleFields={
                                legendDefinitions?.map(
                                    (legend) =>
                                        new FormFieldModel({
                                            id: legend.id,
                                            mandatory: false,
                                            name: legend.name,
                                            legendDefinition: legend,
                                            valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name,
                                        })
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

DataSourceConfigurationForm.propTypes = {
    path: PropTypes.string.isRequired,
};

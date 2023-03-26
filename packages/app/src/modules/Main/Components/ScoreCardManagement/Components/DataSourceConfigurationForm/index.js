import i18n from "@dhis2/d2-i18n";
import {Divider} from "@dhis2/ui";
import {RHFDHIS2FormField} from "@hisptz/dhis2-ui";
import {DHIS2ValueTypes} from "@scorecard/shared";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import TargetsArea
    from "../DataConfiguration/Components/DataGroups/Components/DataSourceConfiguration/Components/TargetsArea";

export default function DataSourceConfigurationForm({path}) {
    const {watch, setValue} = useFormContext();

    useEffect(() => {
        if (path) {
            setValue(path, watch(path))
        }
    }, [watch, path, setValue]);

    return (
        <div className="container p-16 data-source-form-container">
            <div style={{gap: 16}} className="column">
                <RHFDHIS2FormField
                    disabled
                    mandatory
                    valueType={DHIS2ValueTypes.TEXT.name}
                    label={i18n.t("Name")}
                    name={`${path}.name`}
                />
                <RHFDHIS2FormField
                    mandatory
                    valueType={DHIS2ValueTypes.TEXT.name}
                    label={i18n.t("Label")}
                    name={`${path}.label`}
                    validations={{
                        required: i18n.t("Label is required")
                    }}
                />
                <RHFDHIS2FormField
                    valueType={DHIS2ValueTypes.NUMBER.name}
                    label={i18n.t("Weight")}
                    name={`${path}.weight`}
                />
                <div className="row space-between">
                    <div className="column pr-16 effective-gap-settings">
                        <RHFDHIS2FormField
                            valueType={DHIS2ValueTypes.NUMBER.name}
                            label={i18n.t("Effective Gap")}
                            name={`${path}.effectiveGap`}
                        />
                    </div>
                    <div className="column pl-16 indicator-options-settings-area">
                        <RHFDHIS2FormField
                            renderAsCheckbox
                            valueType="BOOLEAN"
                            label={i18n.t("Display Arrows")}
                            name={`${path}.displayArrows`}
                        />
                        <RHFDHIS2FormField
                            renderAsCheckbox
                            valueType="BOOLEAN"
                            label={i18n.t("High is Good")}
                            name={`${path}.highIsGood`}
                        />
                        <RHFDHIS2FormField
                            renderAsCheckbox
                            valueType="BOOLEAN"
                            label={i18n.t("Show Colors")}
                            name={`${path}.showColors`}
                        />
                    </div>
                </div>
                <Divider/>
                <TargetsArea path={path}/>
            </div>
        </div>
    );
}

DataSourceConfigurationForm.propTypes = {
    path: PropTypes.string.isRequired,
};

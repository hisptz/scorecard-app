import i18n from "@dhis2/d2-i18n";
import {Divider} from "@dhis2/ui";
import {RHFCustomInput} from "@hisptz/react-ui";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import TargetsArea
    from "hisptz-scorecard/src/modules/Main/Components/ScoreCardManagement/Components/DataConfiguration/Components/DataGroups/Components/DataSourceConfiguration/Components/TargetsArea";
import {DHIS2ValueTypes} from "../../constants";

export default function DataSourceConfigurationForm({path}) {
    const {watch, setValue} = useFormContext();

    useEffect(() => {
        if (path) {
            setValue(path, watch(path))
        }
    }, [watch, path, setValue]);

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
                <TargetsArea path={path}/>
            </div>
        </div>
    );
}

DataSourceConfigurationForm.propTypes = {
    path: PropTypes.string.isRequired,
};

import i18n from '@dhis2/d2-i18n'
import {RHFCustomInput, useConfirmDialog} from "@hisptz/react-ui";
import {cloneDeep} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {resetLegends} from "../utils/utils";


export default function LegendDefinitionFormField({dataTest}) {
    const {watch, getValues, setValue, resetField} = useFormContext();
    const [defaultValue, setDefaultValue] = useState(getValues("legendDefinitions"));
    const groups = getValues("dataSelection.dataGroups");
    const {confirm} = useConfirmDialog();
    const legendDefinitions = watch("legendDefinitions");

    useEffect(() => {
        function reset() {
            if (defaultValue?.length !== legendDefinitions?.length && (groups && groups?.length > 0)) {
                confirm({
                    title: i18n.t("Confirm Reset Legends"),
                    message: i18n.t("Changing the number of legend definitions will reset the legend values in all configured indicators. Are you sure you want to continue?"),
                    onConfirm: () => {
                        resetLegends(setValue, legendDefinitions)
                    },
                    confirmButtonText: i18n.t("Reset"),
                    confirmButtonColor: "primary",
                    onCancel: () => {
                       resetField("legendDefinitions");
                    }
                })
            } else {
                setDefaultValue(cloneDeep(legendDefinitions))
            }
        }

        reset();
    }, [confirm, legendDefinitions, setValue])

    return (
        <RHFCustomInput
            valueType={"MULTIPLE_FIELDS"}
            name="legendDefinitions"
            label={i18n.t("Legend Definitions")}
            multipleField={{valueType: "LEGEND_DEFINITION"}}
            dataTest={dataTest}
            addable
            deletable
        />
    );
}

LegendDefinitionFormField.propTypes = {
    dataTest: PropTypes.string,
};

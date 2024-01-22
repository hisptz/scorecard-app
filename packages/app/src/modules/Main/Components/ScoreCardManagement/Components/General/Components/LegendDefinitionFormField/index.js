import i18n from '@dhis2/d2-i18n'
import {RHFDHIS2FormField} from "@hisptz/dhis2-ui";
import React from "react";
import {useResetLegends} from "./hooks/useResetLegends";

export default function LegendDefinitionFormField() {

    const {shouldVerify, onResetLegends} = useResetLegends();

    return (
        <RHFDHIS2FormField
            label={i18n.t("Legend Definitions")}
            onResetLegends={onResetLegends}
            shouldVerify={shouldVerify}
            valueType="LEGEND_DEFINITIONS"
            name={"legendDefinitions"}
            mandatory
        />
    )
}

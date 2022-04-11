import i18n from '@dhis2/d2-i18n'
import {RHFLegendDefinitionsField} from "@hisptz/react-ui";
import React from "react";
import {useResetLegends} from "./hooks/useResetLegends";

export default function LegendDefinitionFormField() {

    const {shouldVerify, onResetLegends} = useResetLegends();

    return (
        <RHFLegendDefinitionsField
            label={i18n.t("Legend Definitions")}
            onResetLegends={onResetLegends}
            shouldVerify={shouldVerify}
            valueType=""
            name={"legendDefinitions"}
            mandatory
        />
    )
}

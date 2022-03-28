import i18n from '@dhis2/d2-i18n'
import {Field, colors} from "@dhis2/ui";
import React from "react";
import {useFormContext} from "react-hook-form";
import {AddLegendDefinition} from "./components/AddLegendDefinition";
import {EditLegendDefinition} from "./components/EditLegendDefinition";
import {useManageLegendDefinitions} from "./hooks/useManageLegendDefinitions";


export default function LegendDefinitionFormField() {
    const { getFieldState, formState } = useFormContext();
    const {
        nonDefaultLegendDefinitions,
        defaultLegendDefinitions,
        onAdd,
        onDelete,
        onEdit,
    } = useManageLegendDefinitions();

    const fieldState = getFieldState("legendDefinitions", formState);

    return (
        <div className="p-8" style={fieldState.error ? {border: `1px solid ${colors.red600}`, borderRadius: 4}:{}}>
            <Field error={fieldState?.error} validationText={fieldState?.error?.message} label={i18n.t("Legend Definitions")}
                   name="defaultLegendFields">
                {
                    nonDefaultLegendDefinitions?.map((legendDefinition) => (
                        <EditLegendDefinition key={`${legendDefinition.id}`} legendDefinition={legendDefinition}
                                              onEdit={onEdit}
                                              onDelete={onDelete}/>
                    ))
                }
                <div style={{padding: 16, height: 10}}/>
                {
                    defaultLegendDefinitions?.map((legendDefinition) => (
                        <EditLegendDefinition key={`${legendDefinition.id}`} legendDefinition={legendDefinition}
                                              onEdit={onEdit}/>
                    ))
                }
                <AddLegendDefinition onAdd={onAdd}/>
            </Field>
        </div>
    );
}

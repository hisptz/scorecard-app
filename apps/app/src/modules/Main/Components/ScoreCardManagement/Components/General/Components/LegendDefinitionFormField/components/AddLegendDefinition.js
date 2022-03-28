import i18n from "@dhis2/d2-i18n";
import {Button, Field, IconAdd24} from "@dhis2/ui";
import {RHFCustomInput} from "@hisptz/react-ui";
import {DHIS2ValueTypes} from "@hisptz/scorecard-constants";
import PropTypes from "prop-types";
import React from "react";
import {FormProvider, useForm} from "react-hook-form";

export function AddLegendDefinition({onAdd}) {
    const form = useForm();

    const onAddClick = () => {
        form.handleSubmit(({newLegendDefinition}) => onAdd(newLegendDefinition))();
        form.reset({newLegendDefinition: {}});
    };

    const value = form.watch("newLegendDefinition");
    const disableButton = !value?.color || !value?.name;
    const error = form.getFieldState("newLegendDefinition")?.error;

    return (
        <FormProvider {...form}>
            <Field error={error} validationText={error?.message} label={i18n.t("New Legend Definition")}>
                <div className="row gap-16 align-items-center">
                    <RHFCustomInput
                        validations={{
                            validate: (value) => {
                                if (!value?.color) {
                                    return i18n.t("Color is required")
                                }
                                if (!value?.name) {
                                    return i18n.t("Label is required")
                                }
                                return true;
                            }
                        }}
                        name="newLegendDefinition"
                        valueType={DHIS2ValueTypes.LEGEND_DEFINITION.name}/>
                    <Button disabled={disableButton} icon={<IconAdd24/>}
                            onClick={onAddClick}>{i18n.t("Add")}</Button>
                </div>
            </Field>
        </FormProvider>
    )
}

AddLegendDefinition.propTypes = {
    onAdd: PropTypes.func.isRequired
};


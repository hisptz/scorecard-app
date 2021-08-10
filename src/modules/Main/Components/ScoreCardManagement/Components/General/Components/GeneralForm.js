import i18n from '@dhis2/d2-i18n'
import {PeriodType} from "@iapps/period-utilities";
import PropTypes from 'prop-types'
import React from "react";
import {DHIS2ValueTypes} from "../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../shared/Components/CustomForm/models";
import GeneralFormField from "./GeneralFormField";
//TODO: Styling using media queries instead


export default function GeneralForm({formRef}) {
    const periodTypes = new PeriodType().get();

    return (
        <form ref={formRef} >
            <div className="column">
                <GeneralFormField
                    field={
                        new FormFieldModel({
                            id: "title",
                            name: "title",
                            mandatory: true,
                            formName: i18n.t('Title'),
                            valueType: DHIS2ValueTypes.TEXT.name,
                        })
                    }
                />
                <GeneralFormField
                    field={
                        new FormFieldModel({
                            id: "subtitle",
                            name: "subtitle",
                            mandatory: false,
                            formName: i18n.t('Subtitle'),
                            valueType: DHIS2ValueTypes.TEXT.name,
                        })
                    }
                />
                <GeneralFormField
                    field={
                        new FormFieldModel({
                            id: "description",
                            name: "description",
                            mandatory: true,
                            formName: i18n.t('Description'),
                            valueType: DHIS2ValueTypes.LONG_TEXT.name,
                        })
                    }
                />
                <div className="w-25">
                    <GeneralFormField
                        field={
                            new FormFieldModel({
                                id: "periodType",
                                name: "periodType",
                                mandatory: true,
                                formName: i18n.t('Period Type'),
                                valueType: DHIS2ValueTypes.TEXT.name,
                                optionSet: {
                                    options: periodTypes?.map(({name, id}) => ({
                                        name,
                                        code: id,
                                    })),
                                },
                            })
                        }
                    />
                </div>
                <GeneralFormField
                    field={
                        new FormFieldModel({
                            id: "customHeader",
                            name: "customHeader",
                            mandatory: false,
                            formName: i18n.t('Custom Header'),
                            valueType: DHIS2ValueTypes.RICH_TEXT.name,
                        })
                    }
                />
                <div className="w-25">
                    <GeneralFormField
                        field={
                            new FormFieldModel({
                                id: "legendDefinitions",
                                name: "legendDefinitions",
                                formName: i18n.t('Legend Definitions'),
                                valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                                multipleField: new FormFieldModel({
                                    id: "legendDefinition",
                                    name: "legendDefinition",
                                    valueType: DHIS2ValueTypes.LEGEND_DEFINITION.name,
                                }),
                            })
                        }
                    />
                </div>
                <div className="w-25">
                    <GeneralFormField
                        field={
                            new FormFieldModel({
                                id: "additionalLabels",
                                name: "additionalLabels",
                                formName: i18n.t('Additional Labels'),
                                valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                                multipleField: new FormFieldModel({
                                    id: "additionalLabel",
                                    name: "additionalLabel",
                                    valueType: DHIS2ValueTypes.TEXT.name,
                                }),
                            })
                        }
                    />
                </div>
            </div>
        </form>
    );
}

GeneralForm.propTypes = {
    formRef: PropTypes.instanceOf(HTMLFormElement)
};


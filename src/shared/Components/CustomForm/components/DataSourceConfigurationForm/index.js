import {Divider, ReactFinalForm} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";
import {DHIS2ValueTypes} from "../../constants";
import {FormFieldModel} from "../../models";
import CustomField from "../CustomField";

const {Form, FormSpy} = ReactFinalForm

export default function DataSourceConfigurationForm({defaultValues, onFormChange, legendDefinitions}) {
    return (
        <div className='container p-16'>
            <Form onSubmit={console.log} initialValues={defaultValues}>
                {
                    ({handleSubmit}) => (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <FormSpy onChange={onFormChange}/>
                                <div className='column'>
                                    <CustomField field={new FormFieldModel({
                                        id: 'displayName',
                                        formName: 'Name',
                                        mandatory: true,
                                        name: 'displayName',
                                        disabled: true,
                                        valueType: DHIS2ValueTypes.TEXT.name
                                    })}/>
                                    <CustomField field={new FormFieldModel({
                                        id: 'label',
                                        formName: 'Label',
                                        mandatory: true,
                                        name: 'label',
                                        valueType: DHIS2ValueTypes.TEXT.name
                                    })}/>
                                    <CustomField field={new FormFieldModel({
                                        id: 'weight',
                                        formName: 'Weight',
                                        mandatory: false,
                                        name: 'weight',
                                        valueType: DHIS2ValueTypes.NUMBER.name
                                    })}/>
                                    <div className='row space-between'>
                                        <div className='column pr-16'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'effectiveGap',
                                                formName: 'Effective Gap',
                                                mandatory: false,
                                                name: 'effectiveGap',
                                                valueType: DHIS2ValueTypes.NUMBER.name
                                            })}/>
                                        </div>
                                        <div className='column pl-16'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'displayArrows',
                                                formName: 'Display Arrows',
                                                mandatory: false,
                                                name: 'displayArrows',
                                                valueType: DHIS2ValueTypes.TRUE_ONLY.name
                                            })}/>
                                            <CustomField field={new FormFieldModel({
                                                id: 'highIsGood',
                                                formName: 'High is Good',
                                                mandatory: false,
                                                name: 'highIsGood',
                                                valueType: DHIS2ValueTypes.TRUE_ONLY.name
                                            })}/>
                                            <CustomField field={new FormFieldModel({
                                                id: 'showColors',
                                                formName: 'Show Colors',
                                                mandatory: false,
                                                name: 'showColors',
                                                valueType: DHIS2ValueTypes.TRUE_ONLY.name
                                            })}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className='row'>
                                        <div className='column w-100'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'legends',
                                                name: 'legends',
                                                formName: 'Legends',
                                                valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                                                multipleFields: legendDefinitions?.map(legend => (new FormFieldModel({
                                                    id: legend.name,
                                                    mandatory: false,
                                                    name: legend.name,
                                                    legendDefinition: legend,
                                                    valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name
                                                })))
                                            })}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
            </Form>
        </div>
    )
}

DataSourceConfigurationForm.propTypes = {
    defaultValues: PropTypes.object.isRequired,
    legendDefinitions: PropTypes.array.isRequired,
    onFormChange: PropTypes.func.isRequired
};

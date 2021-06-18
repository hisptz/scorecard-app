import PropTypes from 'prop-types'
import React from 'react'
import CustomForm from "../../../../../../shared/Components/CustomForm";
import {DHIS2ValueTypes} from "../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../shared/Components/CustomForm/models";

export default function GeneralScorecardForm({formReference}) {

    const formFields = [
        new FormFieldModel({
            id: 'title',
            name: 'Title',
            mandatory: true,
            formName: 'Title',
            valueType: DHIS2ValueTypes.TEXT.name
        }),
        new FormFieldModel({
            id: 'description',
            name: 'Description',
            mandatory: true,
            formName: 'Description',
            valueType: DHIS2ValueTypes.LONG_TEXT.name
        }),
        new FormFieldModel({
            id: 'header',
            name: 'Custom Header',
            mandatory: true,
            formName: 'Custom Header',
            valueType: DHIS2ValueTypes.RICH_TEXT.name
        }),
        new FormFieldModel({
            id: 'legendDefinitions',
            name: 'legendDefinitions',
            formName: 'Legend Definitions',
            valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
            multipleField: new FormFieldModel({
                id: 'legendDefinition',
                name: 'legendDefinition',
                valueType: DHIS2ValueTypes.LEGEND_DEFINITION.name
            })
        }),
        new FormFieldModel({
            id: 'additionalLabels',
            name: 'additionalLabels',
            formName: 'Additional Labels',
            valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
            multipleField: new FormFieldModel({
                id: 'additionalLabel',
                name: 'additionalLabel',
                valueType: DHIS2ValueTypes.TEXT.name
            })
        }),
    ]

    return (
        <div className='container'>
            <div className='column space-between'>
                <CustomForm formReference={formReference} onSubmit={console.log} fields={formFields}/>
            </div>
        </div>
    )
}

GeneralScorecardForm.propTypes = {
    formReference: PropTypes.any.isRequired
};


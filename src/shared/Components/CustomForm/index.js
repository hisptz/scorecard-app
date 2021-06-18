import {ReactFinalForm} from '@dhis2/ui'
import {map} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import CustomField from "./components/CustomField";
import {FormFieldModel} from "./models";

const {Form} = ReactFinalForm
export default function CustomForm({onSubmit, fields, formReference, initialValues}) {
    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {
                ({handleSubmit}) => (
                    <form ref={formReference} onSubmit={handleSubmit}>
                        {
                            map(fields, (field) => <CustomField key={field?.id} field={field}/>)
                        }
                    </form>
                )
            }
        </Form>
    )
}

CustomForm.propTypes = {
    formReference: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel)),
    initialValues: PropTypes.object
}



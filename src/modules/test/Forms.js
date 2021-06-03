import { Button, alphaNumeric } from '@dhis2/ui'
import {map} from 'lodash'
import React, {useRef} from 'react'
import CustomForm from "../../shared/CustomForm";
import {DHIS2ValueTypes} from "../../shared/CustomForm/constants"
import {FormFieldModel} from "../../shared/CustomForm/models";


export default function ExampleForms() {

    const fields = [...map(Object.values(DHIS2ValueTypes), ({name, formName})=> new FormFieldModel({
        id: name,
        name,
        formName,
        valueType: name,
        mandatory: true,
        min: 5,
        max: 50,
        validations: alphaNumeric
    })),]

    const ref = useRef(HTMLFormElement);

    return (
        <div style={{width: '25%'}}>
            <CustomForm formReference={ref} onSubmit={console.log} fields={fields}/>
            <Button primary onClick={()=> ref.current.requestSubmit()} >Submit</Button>
        </div>
    )
}

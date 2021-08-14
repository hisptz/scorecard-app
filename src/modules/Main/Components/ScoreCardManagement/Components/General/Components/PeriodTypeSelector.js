import {SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import {Period, PeriodType} from "@iapps/period-utilities";
import React from 'react'


export default function PeriodTypeSelector({value, onChange}){
    const periodTypes = new PeriodType().get();

    return(
       <SingleSelectField Period>

       </SingleSelectField>
    )
}

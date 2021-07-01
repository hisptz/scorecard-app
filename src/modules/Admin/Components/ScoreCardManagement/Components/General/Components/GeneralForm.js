import {ReactFinalForm} from '@dhis2/ui'
import {PeriodType} from "@iapps/period-utilities";
import {pick} from 'lodash'
import React from 'react'
import {useRecoilState} from "recoil";
import Scorecard from "../../../../../../../core/models/scorecard";
import ScorecardState from "../../../../../../../core/state/scorecard";
import CustomField from "../../../../../../../shared/Components/CustomForm/components/CustomField";
import {DHIS2ValueTypes} from "../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../shared/Components/CustomForm/models";
const {Form, FormSpy} = ReactFinalForm;

const generalFormFields = [
    'title',
    'subtitle',
    'customHeader',
    'description',
    'periodType',
    'legendDefinitions',
    'additionalLabels'
]

//TODO: Styling using media queries instead

export default function GeneralForm() {
    const [scorecardState, setScorecardState] = useRecoilState(ScorecardState)
    const periodTypes = new PeriodType().get()

    const onChange = ({values}) => {
        setScorecardState(prevState=>Scorecard.setObject(prevState, values))
    }

    return (
        <Form debug={console.log} keepDirtyOnReinitialize validateOnBlur onSubmit={() => {
        }} initialValues={pick(scorecardState, generalFormFields)}>
            {
                ({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <FormSpy onChange={onChange}/>
                        <div className='column'>
                            <CustomField field={new FormFieldModel({
                                id: 'title',
                                name: 'title',
                                mandatory: true,
                                formName: 'Title',
                                valueType: DHIS2ValueTypes.TEXT.name
                            })}/>
                            <CustomField field={new FormFieldModel({
                                id: 'subtitle',
                                name: 'subtitle',
                                mandatory: false,
                                formName: 'Subtitle',
                                valueType: DHIS2ValueTypes.TEXT.name
                            })}/>
                            <CustomField field={new FormFieldModel({
                                id: 'description',
                                name: 'description',
                                mandatory: true,
                                formName: 'Description',
                                valueType: DHIS2ValueTypes.LONG_TEXT.name
                            })}/>
                            <div className='w-25'>
                                <CustomField field={new FormFieldModel({
                                    id: 'periodType',
                                    name: 'periodType',
                                    mandatory: true,
                                    formName: 'Period Type',
                                    valueType: DHIS2ValueTypes.TEXT.name,
                                    optionSet: {
                                        options: periodTypes?.map(({name, id}) => ({
                                            name,
                                            code: id
                                        }))
                                    }
                                })}/>
                            </div>

                            <CustomField field={new FormFieldModel({
                                id: 'customHeader',
                                name: 'customHeader',
                                mandatory: true,
                                formName: 'Custom Header',
                                valueType: DHIS2ValueTypes.RICH_TEXT.name
                            })}/>
                            <div className='w-25'>
                                <CustomField field={new FormFieldModel({
                                    id: 'legendDefinitions',
                                    name: 'legendDefinitions',
                                    formName: 'Legend Definitions',
                                    valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                                    multipleField: new FormFieldModel({
                                        id: 'legendDefinition',
                                        name: 'legendDefinition',
                                        valueType: DHIS2ValueTypes.LEGEND_DEFINITION.name
                                    })
                                })}/>
                            </div>
                            <div className='w-25'>
                                <CustomField field={new FormFieldModel({
                                    id: 'additionalLabels',
                                    name: 'additionalLabels',
                                    formName: 'Additional Labels',
                                    valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                                    multipleField: new FormFieldModel({
                                        id: 'additionalLabel',
                                        name: 'additionalLabel',
                                        valueType: DHIS2ValueTypes.TEXT.name
                                    })
                                })}/>
                            </div>

                        </div>
                    </form>
                )
            }
        </Form>
    )
}

import {Divider, ReactFinalForm} from '@dhis2/ui'
import {debounce} from 'lodash'
import React from 'react'
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../../../../../../core/state/scorecard";
import CustomField from "../../../../../../../../../../../../shared/Components/CustomForm/components/CustomField";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../../../../../../shared/Components/CustomForm/models";

const {Form, FormSpy} = ReactFinalForm
export default function DataSourceConfigurationForm() {
    const scorecardEditState = useRecoilValue(ScorecardEditState);
    const selectedGroupIndex = scorecardEditState?.selectedGroupIndex;
    const selectedDataSourceIndex = scorecardEditState?.selectedDataSourceIndex;
    const path = ['dataSourceGroups', selectedGroupIndex, 'dataSources', selectedDataSourceIndex]
    const [selectedDataSource, updateSelectedDataSource] = useRecoilState(ScorecardStateSelector(path));
    const onFormChange = debounce(({values}) => {
        const updateValues = {...selectedDataSource, ...values}
        updateSelectedDataSource(updateValues)
    })

    return (
        <div className='container p-16'>
            <Form onSubmit={console.log} initialValues={selectedDataSource}>
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
                                        <div className='column'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'targetReached',
                                                formName: 'Target Reached',
                                                mandatory: false,
                                                name: 'targetReached',
                                                legendDefinition: {
                                                    name: 'Target Reached',
                                                    color: '#00FF00'
                                                },
                                                valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name
                                            })}/>
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



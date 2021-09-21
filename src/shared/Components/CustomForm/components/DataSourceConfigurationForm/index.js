import i18n from '@dhis2/d2-i18n'
import {Divider, ReactFinalForm} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";
import {useRecoilValue} from "recoil";
import {ScorecardConfigDirtyState} from "../../../../../core/state/scorecard";
import {DHIS2ValueTypes} from "../../constants";
import {FormFieldModel} from "../../models";
import CustomField from "../CustomField";

const {Form, FormSpy} = ReactFinalForm

export default function DataSourceConfigurationForm({defaultValues, onFormChange, legendDefinitions}) {
    const targetOnLevels = useRecoilValue(ScorecardConfigDirtyState('targetOnLevels'))

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
                                        formName: i18n.t('Name'),
                                        mandatory: true,
                                        name: 'displayName',
                                        disabled: true,
                                        valueType: DHIS2ValueTypes.TEXT.name
                                    })}/>
                                    <CustomField field={new FormFieldModel({
                                        id: 'label',
                                        formName: i18n.t('Label'),
                                        mandatory: true,
                                        name: 'label',
                                        valueType: DHIS2ValueTypes.TEXT.name
                                    })}/>
                                    <CustomField field={new FormFieldModel({
                                        id: 'weight',
                                        formName: i18n.t('Weight'),
                                        mandatory: false,
                                        name: 'weight',
                                        valueType: DHIS2ValueTypes.NUMBER.name
                                    })}/>
                                    <div className='row space-between'>
                                        <div className='column pr-16 effective-gap-settings'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'effectiveGap',
                                                formName: i18n.t('Effective Gap'),
                                                mandatory: false,
                                                name: 'effectiveGap',
                                                valueType: DHIS2ValueTypes.NUMBER.name
                                            })}/>
                                        </div>
                                        <div className='column pl-16 indicator-options-settings-area'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'displayArrows',
                                                formName: i18n.t('Display Arrows'),
                                                mandatory: false,
                                                name: 'displayArrows',
                                                valueType: DHIS2ValueTypes.TRUE_ONLY.name
                                            })}/>
                                            <CustomField field={new FormFieldModel({
                                                id: 'highIsGood',
                                                formName: i18n.t('High is Good'),
                                                mandatory: false,
                                                name: 'highIsGood',
                                                valueType: DHIS2ValueTypes.TRUE_ONLY.name
                                            })}/>
                                            <CustomField field={new FormFieldModel({
                                                id: 'showColors',
                                                formName: i18n.t('Show Colors'),
                                                mandatory: false,
                                                name: 'showColors',
                                                valueType: DHIS2ValueTypes.TRUE_ONLY.name
                                            })}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className='row'>
                                        <div className='column w-100 legend-settings-area'>
                                            <CustomField field={new FormFieldModel({
                                                id: 'legends',
                                                name: 'legends',
                                                formName: i18n.t('Legends'),
                                                valueType: targetOnLevels ? DHIS2ValueTypes.LEVEL_LEGEND_MIN_MAX.name : DHIS2ValueTypes.NORMAL_LEGEND_MIN_MAX.name,
                                                multipleFields: legendDefinitions?.map(legend => (new FormFieldModel({
                                                    id: legend.id,
                                                    mandatory: false,
                                                    name: legend.name,
                                                    legendDefinition: legend,
                                                    valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name
                                                }))),
                                                weight: 100,
                                                highIsGood: true
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

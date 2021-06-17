import {CheckboxFieldFF, InputFieldFF, ReactFinalForm, SingleSelectFieldFF, TextAreaFieldFF} from '@dhis2/ui';
import {map} from 'lodash'
import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {DHIS2ValueTypes} from "../../constants";
import {FormFieldModel} from "../../models";
import LegendDefinitionField from "./components/LegendDefinitionField";
import LegendMinMax from "./components/LegendMinMax";
import RichTextEditor from "./components/RichTextEditor";
import classes from './CustomField.module.css'

const {Field} = ReactFinalForm;


export default function CustomField({field}) {
    const {name, formName, valueType, validations, min, max, mandatory, optionSet, disabled} = field || {}
    const options = useMemo(() => map(optionSet?.options, ({name, code}) => ({
        label: name,
        value: code
    })), [optionSet?.options]);
    const component = useMemo(() => {
        if (optionSet && optionSet.options) {
            return SingleSelectFieldFF
        } else {
            switch (valueType) {
                case DHIS2ValueTypes.DATE.name:
                case DHIS2ValueTypes.TEXT.name:
                case DHIS2ValueTypes.NUMBER.name:
                case DHIS2ValueTypes.INTEGER.name:
                    return InputFieldFF
                case DHIS2ValueTypes.LONG_TEXT.name:
                    return TextAreaFieldFF
                case DHIS2ValueTypes.TRUE_ONLY.name:
                    return CheckboxFieldFF
                case DHIS2ValueTypes.LEGEND_DEFINITION.name:
                    return LegendDefinitionField
                case DHIS2ValueTypes.RICH_TEXT.name:
                    return RichTextEditor
                case DHIS2ValueTypes.LEGEND_MIN_MAX.name:
                    return LegendMinMax
                default:
                    return InputFieldFF
            }
        }
    }, [optionSet, valueType]);
    const type = useMemo(() => DHIS2ValueTypes[valueType].formName, [valueType]);
    return (
        <div className={classes['field-container']}>
            <Field
                name={name}
                label={formName}
                validate={validations}
                legendDefinition={{
                name: 'Target Reached/ Goal Achieved', color: '#000000' }
                }
                min={min}
                max={max}
                type={type}
                required={mandatory}
                disabled={disabled}
                options={options}
                component={component}
            />
        </div>
    )
}

CustomField.propTypes = {
    field: PropTypes.instanceOf(FormFieldModel).isRequired
};

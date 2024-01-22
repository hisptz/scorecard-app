import {InputField, ReactFinalForm, TextAreaField} from "@dhis2/ui";
import {map} from "lodash";
import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {FormFieldModel} from "../../models";
import CustomCheckboxField from "./components/CustomCheckboxField";
import CustomSingleSelect from "./components/CustomSingleSelect";
import LegendDefinitionField from "./components/LegendDefinitionField";
import LegendMinMax from "./components/LegendMinMax";
import MultipleFieldsField from "./components/MultipleFieldsField";
import RichTextEditor from "./components/RichTextEditor";
import classes from "./CustomField.module.css";
import {DHIS2ValueTypes} from "../../constants";

const {Field} = ReactFinalForm;

export function CustomInput({input, valueType, optionSet, ...props}) {
    const type = useMemo(() => DHIS2ValueTypes[valueType].formName, [valueType]);
    const options = map(optionSet?.options, ({name, code}) => ({
        label: name,
        value: code,
    }));
    const Input = useMemo(() => {
        if (optionSet && optionSet.options) {
            return CustomSingleSelect;
        } else {
            switch (valueType) {
                case DHIS2ValueTypes.DATE.name:
                case DHIS2ValueTypes.TEXT.name:
                case DHIS2ValueTypes.NUMBER.name:
                case DHIS2ValueTypes.INTEGER.name:
                    return InputField;
                case DHIS2ValueTypes.LONG_TEXT.name:
                    return TextAreaField;
                case DHIS2ValueTypes.TRUE_ONLY.name:
                    return CustomCheckboxField;
                case DHIS2ValueTypes.LEGEND_DEFINITION.name:
                    return LegendDefinitionField;
                case DHIS2ValueTypes.RICH_TEXT.name:
                    return RichTextEditor;
                case DHIS2ValueTypes.LEGEND_MIN_MAX.name:
                    return LegendMinMax;
                case DHIS2ValueTypes.MULTIPLE_FIELDS.name:
                    return MultipleFieldsField;
                default:
                    return InputField;
            }
        }
    }, [optionSet, valueType]);

    const onChange = input.onChange;

    return (
        <div className={classes["field-container"]}>
            <Input
                {...input}
                {...props}
                type={type}
                options={options}
                onChange={({value}) => onChange(value)}
            />
        </div>
    );
}

CustomInput.propTypes = {
    input: PropTypes.object.isRequired,
    valueType: PropTypes.string.isRequired,
    optionSet: PropTypes.object,
};

export default function CustomField({field, ...props}) {
    const {
        name,
        formName,
        valueType,
        validations,
        min,
        max,
        mandatory,
        optionSet,
        disabled,
        multipleField,
        legendDefinition,
        multipleFields,
    } = field || {};

    return (
        <Field
            name={name}
            label={formName}
            validate={validations}
            multipleField={multipleField}
            min={min}
            max={max}
            valueType={valueType}
            required={mandatory}
            disabled={disabled}
            optionSet={optionSet}
            component={CustomInput}
            legendDefinition={legendDefinition}
            multipleFields={multipleFields}
            {...props}
        />
    );
}

CustomField.propTypes = {
    field: PropTypes.instanceOf(FormFieldModel).isRequired,
};

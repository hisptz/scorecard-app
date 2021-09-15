import PropTypes from 'prop-types'
import React, {useEffect, useMemo} from "react";
import {generateLegendDefaults} from "../../../../../utils/utils";
import {DHIS2ValueTypes} from "../../../constants";
import {FormFieldModel} from "../../../models";
import {CustomInput} from "../../CustomField";

export default function TargetsField(props) {
    const {name, onChange, multipleFields, value: initialValue,weight, highIsGood} = props
    const value = useMemo(() => Array.isArray(initialValue) ? initialValue : generateLegendDefaults(multipleFields, weight, highIsGood), [highIsGood, initialValue, multipleFields, weight]);

    useEffect(() => {
        if (!Array.isArray(initialValue)) {
            onChange({
                value
            })
        }
    }, [value, initialValue]);


    const onValueChange = (value) => {
        onChange({
            value
        })
    }

    return <CustomInput valueType={DHIS2ValueTypes.MULTIPLE_FIELDS.name}
                        input={{name, value, onChange: onValueChange}}  {...props} />
}

TargetsField.propTypes = {
    highIsGood: PropTypes.bool.isRequired,
    multipleFields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel)).isRequired,
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
};


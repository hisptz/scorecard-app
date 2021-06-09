import {Field, Input, Popover} from '@dhis2/ui'
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {SketchPicker} from "react-color";
import classes from '../CustomField.module.css'


function ColorPickerPopper({reference, value, onClose, onChange}) {
    return (
        <Popover
            reference={reference}
            placement='auto'
            strategy='fixed'
            className='popper'
            onClickOutside={onClose}
        >
            <SketchPicker
                color={{hex: value}}
                onChange={color => {
                    onChange(color.hex);
                    onClose();
                }}
            />
        </Popover>
    )
}
ColorPickerPopper.propTypes = {
    reference: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
};


export default function LegendDefinitionField({input,  ...props}) {
    const {name, label,value = {color: '#FFFF00', name: 'Legend One'}, onChange,} = input
    const {color, name: legendName} = value;
    const [reference, setReference] = useState(undefined);

    const onColorChange = (color) =>{
        onChange({
            ...value,
            color
        })
    }

    const onNameChange = (newName) =>{
        onChange({
            ...value,
            name: newName.value
        })
    }

    return (
        <Field  name={name} label={label} value={value}  {...props} {...input} >
            <div className={classes['legend-definition-container']}>
                <div onClick={e => setReference(e.currentTarget)} style={{background: color, borderColor: color}} className={classes['legend-color']}>
                    {color}
                </div>
                <div className={classes['legend-input']}>
                    <Input onChange={onNameChange} value={legendName} />
                </div>
            </div>
            {
                reference &&
                <ColorPickerPopper onClose={() => setReference(undefined)} reference={reference} value={value?.color}
                                   onChange={onColorChange}/>
            }
        </Field>
    )
}

LegendDefinitionField.propTypes = {
    input: PropTypes.object
};


import {Field, InputField} from '@dhis2/ui'
import PropTypes from "prop-types";
import React from 'react'


export default function LegendMinMax({name, value, onChange, legendDefinition, ...props}) {
    const {color, name: legendName} = legendDefinition || {};

    return (
        <Field name={name} value={value?.value}  {...props} >
            <div className='row space-between w-100'>
                <div className='row'>
                    <div className='pr-16'
                         style={{backgroundColor: color, border: `1px solid ${color}`, height: 16, width: 24}}/>
                    <label className='pl-8'>{legendName}</label>
                </div>
                <div className='row space-between'><InputField type='number' onChange={({value: newValue}) => {
                    onChange({
                        name,
                        value: {
                            ...value?.value,
                            min: newValue
                        }
                    })
                }
                } className='pr-8' label='Min'/>
                    <InputField type='number' onChange={({value: newValue}) => {
                        onChange({
                            name,
                            value: {
                                ...value?.value,
                                max: newValue
                            }
                        })
                    }
                    } label='Max'/></div>
            </div>
        </Field>
    )

}
LegendMinMax.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    legendDefinition: PropTypes.object,
    value: PropTypes.object,
};

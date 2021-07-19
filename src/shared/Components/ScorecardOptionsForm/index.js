import {CheckboxField, Radio} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";
import AverageDisplayType from "../../../core/constants/averageDisplayType";

export default function ScorecardOptionsForm({options, onChange}){

    return(
        <div className='container p-16'>
            <div className='row'>
                <div className='column'>
                    <h3>Visibility</h3>
                    <div className='column'>
                        <CheckboxField checked={options?.legend} onChange={onChange('legend')} value='legend'
                                       label='Legend'/>
                        <CheckboxField checked={options?.title} onChange={onChange('title')} value='title'
                                       label='Title'/>
                        <CheckboxField checked={options?.itemNumber} onChange={onChange('itemNumber')}
                                       value='itemNumber' label='Item Number'/>
                        <CheckboxField checked={options?.emptyRows} onChange={onChange('emptyRows')}
                                       value='emptyRows' label='Empty Rows'/>
                        <CheckboxField checked={options?.showHierarchy} onChange={onChange('showHierarchy')}
                                       value='showHierarchy'
                                       label='Show Hierarchy'/>
                        <CheckboxField checked={options?.averageColumn} onChange={onChange('averageColumn')}
                                       value='averageColumn'
                                       label='Average Column'/>
                        <CheckboxField checked={options?.averageRow} onChange={onChange('averageRow')}
                                       value='averageRow' label='Average Row'/>
                    </div>
                    <h3>Average</h3>
                    <div className='column'>
                        <Radio onChange={() => onChange('averageDisplayType')(AverageDisplayType.ALL)}
                               checked={options?.averageDisplayType === AverageDisplayType.ALL}
                               value={AverageDisplayType.ALL} label='All'/>
                        <Radio onChange={() => onChange('averageDisplayType')(AverageDisplayType.BELOW_AVERAGE)}
                               checked={options?.averageDisplayType === AverageDisplayType.BELOW_AVERAGE}
                               value={AverageDisplayType.BELOW_AVERAGE} label='Below Average'/>
                        <Radio onChange={() => onChange('averageDisplayType')(AverageDisplayType.ABOVE_AVERAGE)}
                               checked={options?.averageDisplayType === AverageDisplayType.ABOVE_AVERAGE}
                               value={AverageDisplayType.ABOVE_AVERAGE} label='Above Average'/>
                    </div>
                    <h3>Options</h3>
                    <div className='column'>
                        <CheckboxField checked={options?.score} onChange={onChange('score')} value='score'
                                       label='Score'/>
                        <CheckboxField checked={options?.arrows} onChange={onChange('arrows')} value='arrows'
                                       label='Arrows'/>
                        <CheckboxField checked={options?.showDataInRows} onChange={onChange('showDataInRows')}
                                       value='showDataInRows' label='Show Data in Rows'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

ScorecardOptionsForm.propTypes = {
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

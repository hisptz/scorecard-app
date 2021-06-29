import {CheckboxField, Radio} from '@dhis2/ui'
import React from 'react'
import {useRecoilState} from "recoil";
import AverageDisplayType from "../../../../../../core/constants/averageDisplayType";
import {ScorecardStateSelector} from "../../../../../../core/state/scorecard";


export default function OptionsScorecardForm() {
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardStateSelector('scorecardOptions'))

    const onChange = (value) => ({checked}) => {
        setScorecardOptions(prevState => ({
            ...prevState,
            [value]: checked,
        }))
    }

    const onAverageChange = (value) => {
        setScorecardOptions(prevState => ({
            ...prevState,
            averageDisplayType: value
        }))
    }

    return (
        <div className='container p-16'>
            <div className='row'>
                <div className='column'>
                    <h3>Visibility</h3>
                    <div className='column'>
                        <CheckboxField checked={scorecardOptions?.legend} onChange={onChange('legend')} value='legend'
                                       label='Legend'/>
                        <CheckboxField checked={scorecardOptions?.title} onChange={onChange('title')} value='title'
                                       label='Title'/>
                        <CheckboxField checked={scorecardOptions?.itemNumber} onChange={onChange('itemNumber')}
                                       value='itemNumber' label='Item Number'/>
                        <CheckboxField checked={scorecardOptions?.emptyRows} onChange={onChange('emptyRows')}
                                       value='emptyRows' label='Empty Rows'/>
                        <CheckboxField checked={scorecardOptions?.showHierarchy} onChange={onChange('showHierarchy')}
                                       value='showHierarchy'
                                       label='Show Hierarchy'/>
                        <CheckboxField checked={scorecardOptions?.averageColumn} onChange={onChange('averageColumn')}
                                       value='averageColumn'
                                       label='Average Column'/>
                        <CheckboxField checked={scorecardOptions?.averageRow} onChange={onChange('averageRow')}
                                       value='averageRow' label='Average Row'/>
                    </div>
                    <h3>Average</h3>
                    <div className='column'>
                        <Radio onChange={()=>onAverageChange(AverageDisplayType.ALL)} checked={scorecardOptions?.averageDisplayType === AverageDisplayType.ALL}
                               value={AverageDisplayType.ALL} label='All'/>
                        <Radio onChange={()=>onAverageChange(AverageDisplayType.BELOW_AVERAGE)} checked={scorecardOptions?.averageDisplayType === AverageDisplayType.BELOW_AVERAGE}
                               value={AverageDisplayType.BELOW_AVERAGE} label='Below Average'/>
                        <Radio onChange={()=>onAverageChange(AverageDisplayType.ABOVE_AVERAGE)} checked={scorecardOptions?.averageDisplayType === AverageDisplayType.ABOVE_AVERAGE}
                               value={AverageDisplayType.ABOVE_AVERAGE} label='Above Average'/>
                    </div>
                    <h3>Options</h3>
                    <div className='column'>
                        <CheckboxField checked={scorecardOptions?.score} onChange={onChange('score')} value='score' label='Score'/>
                        <CheckboxField checked={scorecardOptions?.arrows} onChange={onChange('arrows')} value='arrows' label='Arrows'/>
                        <CheckboxField checked={scorecardOptions?.showDataInRows} onChange={onChange('showDataInRows')} value='showDataInRows' label='Show Data in Rows'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

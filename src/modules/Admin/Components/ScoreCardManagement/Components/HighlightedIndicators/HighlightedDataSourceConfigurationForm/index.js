import {debounce} from "lodash";
import React from 'react'
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardConfigEditState, ScorecardConfigStateSelector} from "../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm
    from "../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";

export default function HighlightedDataSourceConfigurationForm() {
    const {selectedHighlightedIndicatorIndex} = useRecoilValue(ScorecardConfigEditState)
    const [selectedHighlightedIndicator, setSelectedHighlightedIndicator] = useRecoilState(ScorecardConfigStateSelector(['highlightedIndicators', selectedHighlightedIndicatorIndex]))
    const legendDefinitions = useRecoilValue(ScorecardConfigStateSelector('legendDefinitions'))

    const onChange = debounce(({values, dirty}) => {
        if (dirty) {
            setSelectedHighlightedIndicator(prevState => ({
                ...prevState,
                ...values
            }))
        }
    })

    return (
        !isNaN(selectedHighlightedIndicatorIndex) ?
            <div className='container-bordered'>
            {
                selectedHighlightedIndicator &&
                <DataSourceConfigurationForm defaultValues={selectedHighlightedIndicator}
                                             legendDefinitions={legendDefinitions} onFormChange={onChange}/>
            }
        </div> : null
    )
}

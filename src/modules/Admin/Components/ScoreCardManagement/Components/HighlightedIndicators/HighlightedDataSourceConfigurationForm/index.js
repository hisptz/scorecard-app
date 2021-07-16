import {debounce} from "lodash";
import React from 'react'
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm
    from "../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";

export default function HighlightedDataSourceConfigurationForm() {
    const {selectedHighlightedIndicatorIndex} = useRecoilValue(ScorecardEditState)
    const [selectedHighlightedIndicator, setSelectedHighlightedIndicator] = useRecoilState(ScorecardStateSelector(['highlightedIndicators', selectedHighlightedIndicatorIndex]))
    const legendDefinitions = useRecoilValue(ScorecardStateSelector('legendDefinitions'))

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

import React from 'react'
import {useRecoilState} from "recoil";
import ScorecardOptions from "../../../../../../core/models/scorecardOptions";
import {ScorecardConfigStateSelector} from "../../../../../../core/state/scorecard";
import ScorecardOptionsForm from "../../../../../../shared/Components/ScorecardOptionsForm";

export default function OptionsScorecardForm() {
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardConfigStateSelector('options'))

    const onChange = (key) => (newValue) => {
        setScorecardOptions(prevState => {
            return ScorecardOptions.set(prevState, key, newValue?.checked ?? newValue)
        })
    }

    const onAverageChange = (value) => {
        setScorecardOptions(prevState => (ScorecardOptions.set(prevState, 'averageDisplayType', value)))
    }


    return (
        <ScorecardOptionsForm options={scorecardOptions} onChange={onChange} onAverageChange={onAverageChange}/>
    )
}

import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardStateSelector, ScorecardViewSelector} from "../../../../../../core/state/scorecard";
import HighlightedIndicator from "./Components/HighlightedIndicator";


export default function HighlightedIndicatorsView() {
    const highlightedIndicators = useRecoilValue(ScorecardStateSelector('highlightedIndicators'))
    const {highlightedIndicators: showHighlightedIndicators} = useRecoilValue(ScorecardViewSelector('options'))
    return (
        showHighlightedIndicators ?
            <div className='column'>
                <div><h3>Highlighted Indicators</h3></div>
                <div className='grid highlighted-indicators-container'>
                    {
                        highlightedIndicators?.map(highlightedIndicator => (
                            <HighlightedIndicator key={highlightedIndicator?.id}
                                                  highlightedIndicator={highlightedIndicator}/>))
                    }
                </div>
            </div> : null

    )
}

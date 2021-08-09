import i18n from '@dhis2/d2-i18n'
import {isEmpty} from 'lodash'
import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardConfigDirtyState, ScorecardViewState} from "../../../../../../core/state/scorecard";
import HighlightedIndicator from "./Components/HighlightedIndicator";

export default function HighlightedIndicatorsView() {
    const highlightedIndicators = useRecoilValue(ScorecardConfigDirtyState('highlightedIndicators'))
    const {highlightedIndicators: showHighlightedIndicators} = useRecoilValue(ScorecardViewState('options'))
    return (
        showHighlightedIndicators && !isEmpty(highlightedIndicators) ?
            <div className='column'>
                <div><h3>{i18n.t('Highlighted Indicators')}</h3></div>
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

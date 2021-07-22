import i18n from '@dhis2/d2-i18n'
import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardStateSelector, ScorecardViewSelector} from "../../../../../../core/state/scorecard";
import {DecreasingArrows, IncreasingArrows} from "../../../../../../shared/Components/ScorecardCell/Components/Arrows";
import LegendView from "./Components/LegendView";

export default function ScorecardLegendsView() {
    const {legend: showLegends} = useRecoilValue(ScorecardViewSelector('options'))
    const legends = useRecoilValue(ScorecardStateSelector('legendDefinitions'))
    return (
        showLegends ? <div className='column'>
            <div><h3>{i18n.t('Legends')}</h3></div>
            <div className='row space-between'>
                <div className='row align-items-center w-50'>
                    {
                        legends?.map(legend => (<LegendView key={legend.color} legend={legend}/>))
                    }
                </div>
                <div className='row align-items-center w-50 end'>
                    <div className='pr-16'>
                        <svg height={14} width={14}><IncreasingArrows y={0} x={7}/></svg>
                        &nbsp; {i18n.t('Increased from last period')}
                    </div>
                    <div>
                        <svg height={14} width={14}><DecreasingArrows y={14} x={7}/></svg>
                        &nbsp; {i18n.t('Decreased from last period')}
                    </div>
                </div>
            </div>
        </div> : null
    )
}

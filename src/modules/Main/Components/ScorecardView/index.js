import React, {Suspense, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {ScorecardIdState, ScorecardViewSelector,} from "../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import HighlightedIndicatorsView from "./Components/HighlightedIndicatorsView";
import ScorecardHeader from "./Components/ScorecardHeader";
import ScorecardLegendsView from "./Components/ScorecardLegendsView";
import ScorecardTable from "./Components/ScorecardTable";
import ScorecardViewHeader from "./Components/ScorecardViewHeader";

export default function ScorecardView() {
    const {id: scorecardId} = useParams()
    const setScorecardIdState = useSetRecoilState(ScorecardIdState)
    const {orgUnits} = useRecoilValue(ScorecardViewSelector('orgUnitSelection'))

    useEffect(() => {
        setScorecardIdState(scorecardId)
    }, [scorecardId]);

    return (
        <Suspense fallback={<FullPageLoader/>}>
            <ScorecardViewHeader/>
            <div className='column p-16' style={{height: '100%', width: '100%'}}>
                <ScorecardHeader/>
                <ScorecardLegendsView/>
                <HighlightedIndicatorsView/>
                <div className='column align-items-center pt-16 flex-1'>
                    <ScorecardTable orgUnits={orgUnits}/>
                </div>
            </div>
        </Suspense>
    )
}

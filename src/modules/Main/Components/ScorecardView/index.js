import {colors} from "@dhis2/ui";
import React, {Suspense, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {ScorecardIdState} from "../../../../core/state/scorecard";
import {ReactComponent as UnderConstruction} from "../../../../resources/images/scorecard_under_construction.svg";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import HighlightedIndicatorsView from "./Components/HighlightedIndicatorsView";
import ScorecardHeader from "./Components/ScorecardHeader";
import ScorecardLegendsView from "./Components/ScorecardLegendsView";
import ScorecardViewHeader from "./Components/ScorecardViewHeader";

export default function ScorecardView() {
    const {id: scorecardId} = useParams()
    const setScorecardIdState = useSetRecoilState(ScorecardIdState)

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
                <div className='flex-1 column align-items-center center'>
                    <UnderConstruction style={{width: 400, height: 200}}/>
                    <p style={{color: colors.grey700, fontStyle: 'italic', fontSize: 20}}>This page is under
                        construction</p>
                </div>
            </div>
        </Suspense>
    )
}

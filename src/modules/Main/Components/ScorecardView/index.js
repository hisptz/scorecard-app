import {CenteredContent, CircularLoader, Layer, layers} from '@dhis2/ui'
import React, {Suspense, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil";
import {
    scorecardDataEngine,
    ScorecardDataLoadingState,
    ScorecardIdState,
    ScorecardTableOrientationState,
    ScorecardViewState,
} from "../../../../core/state/scorecard";
import {UserAuthorityOnScorecard} from "../../../../core/state/user";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import AccessDeniedPage from "./Components/AccessDeniedPage";
import HighlightedIndicatorsView from "./Components/HighlightedIndicatorsView";
import ScorecardHeader from "./Components/ScorecardHeader";
import ScorecardLegendsView from "./Components/ScorecardLegendsView";
import ScorecardTable from "./Components/ScorecardTable";
import ScorecardViewHeader from "./Components/ScorecardViewHeader";

export default function ScorecardView() {
    const {id: scorecardId} = useParams();
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const {orgUnits} = useRecoilValue(ScorecardViewState("orgUnitSelection"));
    const {read: access} = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const loading = useRecoilValue(ScorecardDataLoadingState)
    const downloadRef = useRef()

    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("orgUnitSelection"))
        reset(ScorecardIdState)
        reset(ScorecardTableOrientationState)
        reset(ScorecardDataLoadingState)
        scorecardDataEngine.reset()
    })

    useEffect(() => {
        setScorecardIdState(scorecardId);
        return () => {
            reset()
        };
    }, []);

    if (!access) {
        return <AccessDeniedPage accessType={"view"}/>
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            {loading && <Layer level={layers.blocking} translucent>
                <CenteredContent>
                    <CircularLoader small/>
                </CenteredContent>
            </Layer>}
            <ScorecardViewHeader downloadAreaRef={downloadRef}/>
            <div ref={downloadRef} className="column p-16" style={{height: "100%", width: "100%"}}>
                <ScorecardHeader/>
                <ScorecardLegendsView/>
                <HighlightedIndicatorsView/>
                <div className="column align-items-center pt-16 flex-1">
                    <Suspense fallback={<FullPageLoader/>}>
                        <ScorecardTable
                            nested={false}
                            orgUnits={orgUnits}/>
                    </Suspense>
                </div>
            </div>
        </Suspense>
    );
}

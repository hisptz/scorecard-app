import {CenteredContent, CircularLoader, Layer, layers} from '@dhis2/ui'
import {isEmpty} from 'lodash'
import React, {Suspense, useEffect,lazy,useRef} from "react";
import {useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil";
import {PeriodResolverState} from "../../../../core/state/period";
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
import EmptyOrgUnitsOrPeriod from "./Components/EmptyOrgUnitsOrPeriod";
import HighlightedIndicatorsView from "./Components/HighlightedIndicatorsView";
import ScorecardHeader from "./Components/ScorecardHeader";
const ScorecardLegendsView  = lazy(() => import('./Components/ScorecardLegendsView'));
const ScorecardTable  = lazy(() => import('./Components/ScorecardTable'));
import ScorecardViewHeader from "./Components/ScorecardViewHeader";


export default function ScorecardView() {
    const {id: scorecardId} = useParams();
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const {orgUnits} = useRecoilValue(ScorecardViewState("orgUnitSelection"));
    const {read: access} = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const loading = useRecoilValue(ScorecardDataLoadingState)
    const downloadRef = useRef()
    const periods = useRecoilValue(PeriodResolverState)

    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("orgUnitSelection"))
        reset(ScorecardViewState("periodSelection"))
        reset(ScorecardViewState("tableSort"))
        reset(ScorecardViewState("options"))
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
                    {
                        (!isEmpty(orgUnits) && !isEmpty(periods)) ? <Suspense fallback={<FullPageLoader/>}>
                            <ScorecardTable
                                nested={false}
                                orgUnits={orgUnits}/>
                        </Suspense> : <EmptyOrgUnitsOrPeriod/>
                    }
                </div>
            </div>
        </Suspense>
    );
}

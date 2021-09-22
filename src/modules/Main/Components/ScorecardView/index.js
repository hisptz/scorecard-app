import {isEmpty} from 'lodash'
import React, {lazy, Suspense, useEffect, useMemo, useRef} from "react";
import {useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil";
import ScorecardDataEngine from "../../../../core/models/scorecardData";
import {InitialOrgUnits} from "../../../../core/state/orgUnit";
import {PeriodResolverState} from "../../../../core/state/period";
import {
    ScorecardDataSourceState,
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
import ScorecardViewHeader from "./Components/ScorecardViewHeader";

const ScorecardLegendsView = lazy(() => import('./Components/ScorecardLegendsView'));
const ScorecardTable = lazy(() => import('./Components/ScorecardTable'));

export default function ScorecardView() {
    const {id: scorecardId} = useParams();
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const {orgUnits} = useRecoilValue(InitialOrgUnits);
    const orgUnitsIds = useMemo(() => orgUnits?.map(({id}) => id), [orgUnits])
    const {read: access} = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const downloadRef = useRef()
    const periods = useRecoilValue(PeriodResolverState)

    const initialDataEngine = useMemo(() => new ScorecardDataEngine(), [])

    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("periodSelection"))
        reset(ScorecardViewState("tableSort"))
        reset(ScorecardViewState("options"))
        reset(ScorecardIdState)
        reset(ScorecardTableOrientationState)
        reset(ScorecardDataSourceState)
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
            <ScorecardViewHeader />
            <div ref={downloadRef} className="column p-16" style={{height: "100%", width: "100%"}}>
                <ScorecardHeader dataEngine={initialDataEngine} downloadAreaRef={downloadRef} />
                <ScorecardLegendsView/>
                <HighlightedIndicatorsView/>
                <div className="column align-items-center pt-16 flex-1">
                    {
                        (!isEmpty(orgUnits) && !isEmpty(periods)) ? <Suspense fallback={<FullPageLoader/>}>
                            <ScorecardTable
                                initialDataEngine={initialDataEngine}
                                nested={false}
                                orgUnits={orgUnitsIds}/>
                        </Suspense> : <EmptyOrgUnitsOrPeriod/>
                    }
                </div>
            </div>
        </Suspense>
    );
}


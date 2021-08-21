import React, {Suspense, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil";
import {ScorecardIdState, ScorecardTableOrientationState, ScorecardViewState,} from "../../../../core/state/scorecard";
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
    const userAuthority = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const access = userAuthority.read
    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("orgUnitSelection"))
        reset(ScorecardIdState)
        reset(ScorecardTableOrientationState)
    })
    useEffect(() => {
        setScorecardIdState(scorecardId);
        return () => {
            reset()
        };
    }, [scorecardId]);
    if (!access) {
        return <AccessDeniedPage/>
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            <ScorecardViewHeader/>
            <div className="column p-16" style={{height: "100%", width: "100%"}}>
                <ScorecardHeader/>
                <ScorecardLegendsView/>
                <HighlightedIndicatorsView/>
                <div className="column align-items-center pt-16 flex-1">
                    <Suspense fallback={<FullPageLoader/>}>
                        <ScorecardTable
                            nested={false}
                            orgUnits={orgUnits}
                        />
                    </Suspense>
                </div>
            </div>
        </Suspense>
    );
}

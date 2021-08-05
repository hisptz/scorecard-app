import React, {Suspense, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import ScorecardDataEngine from "../../../../core/models/scorecardData";
import {ScorecardIdState, ScorecardViewState,} from "../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import HighlightedIndicatorsView from "./Components/HighlightedIndicatorsView";
import ScorecardHeader from "./Components/ScorecardHeader";
import ScorecardLegendsView from "./Components/ScorecardLegendsView";
import ScorecardTable from "./Components/ScorecardTable";
import ScorecardViewHeader from "./Components/ScorecardViewHeader";

export default function ScorecardView() {
    const {id: scorecardId} = useParams();
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const resetIdState = useResetRecoilState(ScorecardIdState);
    const {orgUnits} = useRecoilValue(ScorecardViewState("orgUnitSelection"));
    const resetOrgUnitSelection = useResetRecoilState(ScorecardViewState("orgUnitSelection"))
    const scorecardDataEngine = new ScorecardDataEngine()
    useEffect(() => {
        setScorecardIdState(scorecardId);
        return () => {
            resetIdState();
            resetOrgUnitSelection()
        };
    }, [scorecardId]);

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
                            scorecardDataEngine={scorecardDataEngine}
                        />
                    </Suspense>
                </div>
            </div>
        </Suspense>
    );
}

import {SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import React, {Suspense, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {ScorecardIdState, ScorecardTableOrientationState, ScorecardViewState,} from "../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import HighlightedIndicatorsView from "./Components/HighlightedIndicatorsView";
import ScorecardHeader from "./Components/ScorecardHeader";
import ScorecardLegendsView from "./Components/ScorecardLegendsView";
import ScorecardTable from "./Components/ScorecardTable";
import ScorecardViewHeader from "./Components/ScorecardViewHeader";


export default function ScorecardView() {
    const [orientation, setOrientation] = useRecoilState(ScorecardTableOrientationState)
    const {id: scorecardId} = useParams();
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const resetIdState = useResetRecoilState(ScorecardIdState);
    const {orgUnits} = useRecoilValue(ScorecardViewState("orgUnitSelection"));
    const resetOrgUnitSelection = useResetRecoilState(ScorecardViewState("orgUnitSelection"))
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
                <div>
                    <SingleSelectField onChange={({selected})=>setOrientation(selected)} label='Orientation' selected={orientation}>
                        <SingleSelectOption label={'OrgUnit Vs Data'} value={'orgUnitsVsData'} />
                        <SingleSelectOption label={'Data Vs OrgUnit'} value={'dataVsOrgUnits'} />
                    </SingleSelectField>
                </div>
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

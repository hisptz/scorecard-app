import i18n from '@dhis2/d2-i18n'
import {isEmpty} from "lodash";
import React, {lazy, Suspense, useEffect, useMemo, useRef} from "react";
import {useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilValue, useRecoilValueLoadable, useSetRecoilState} from "recoil";
import {FullPageLoader} from "../Loaders";
import AccessDeniedPage from "../Errors/AccessDeniedPage";
import EmptyOrgUnitsOrPeriod from "./components/EmptyOrgUnitsOrPeriod";
import HighlightedIndicatorsView from "./components/HighlightedIndicatorsView";
import ScorecardActions from "./components/ScorecardActions";
import ScorecardHeader from "./components/ScorecardHeader";
import ScorecardViewHeader from "./components/ScorecardViewHeader";
import {SpecificTargetsLibrary} from "./components/SpecificTargetsLibrary";
import {
    InitialOrgUnits,
    IsSpecificTargetsSet,
    PeriodResolverState,
    ScorecardDataSourceState,
    ScorecardIdState,
    ScorecardNameSort,
    ScorecardTableOrientationState,
    ScorecardViewState,
    UserAuthorityOnScorecard
} from "../../state";
import {ScorecardDataEngine} from "../../models";

const ScorecardLegendsView = lazy(() =>
    import("./components/ScorecardLegendsView")
);
const ScorecardTable = lazy(() => import("./components/ScorecardTable"));

export default function ScorecardView({widget}) {
    const {id: scorecardId} = useParams();
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const orgUnitState = useRecoilValueLoadable(InitialOrgUnits);
    const orgUnitsIds = useMemo(() => {
        if (orgUnitState.state === 'hasValue') {
            return orgUnitState.contents?.orgUnits?.map(orgUnit => orgUnit?.id) ?? [];
        }
        return [];
    }, [orgUnitState.state, orgUnitState.contents]);
    const {read: access} = useRecoilValue(
        UserAuthorityOnScorecard(scorecardId)
    );
    const downloadRef = useRef();
    const periods = useRecoilValue(PeriodResolverState);
    const isSpecificTargetsSet = useRecoilValue(IsSpecificTargetsSet)


    const initialDataEngine = useMemo(() => new ScorecardDataEngine(), []);

    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("periodSelection"));
        reset(ScorecardViewState("orgUnitSearchKeyword"))
        reset(ScorecardNameSort(orgUnitsIds));
        reset(ScorecardViewState("options"));
        reset(ScorecardIdState);
        reset(ScorecardTableOrientationState);
        reset(ScorecardDataSourceState);
    });

    useEffect(() => {
        setScorecardIdState(scorecardId);
        return () => {
            reset();
        };
    }, []);

    if (!access) {
        return <AccessDeniedPage accessType={"view"}/>;
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            {
                !widget && <ScorecardViewHeader/>
            }
            <Suspense fallback={<FullPageLoader/>}>
                <div
                    ref={downloadRef}
                    className="column p-16  print-visible"
                    style={{height: "100%", width: "100%", overflow: "visible"}}
                >
                    <ScorecardActions
                        widget={widget}
                        dataEngine={initialDataEngine}
                        downloadAreaRef={downloadRef}
                    />
                    <ScorecardHeader/>
                    <ScorecardLegendsView/>
                    <HighlightedIndicatorsView/>
                    <div className="column align-items-center pt-16 flex-1">
                        {!isEmpty(orgUnitState?.contents?.orgUnits) && !isEmpty(periods) ? (
                            <Suspense fallback={<FullPageLoader small/>}>
                                <ScorecardTable
                                    initialDataEngine={initialDataEngine}
                                    nested={false}
                                    orgUnits={orgUnitsIds}
                                />
                            </Suspense>
                        ) : (
                            <EmptyOrgUnitsOrPeriod/>
                        )}
                        {
                            isSpecificTargetsSet && <div className="hide print-show always-page-break">
                                <div className="always-page-break"/>
                                <h1>{i18n.t("Specific Targets Legends")}</h1>
                                <SpecificTargetsLibrary/>
                            </div>
                        }
                    </div>
                </div>
            </Suspense>
        </Suspense>
    );
}

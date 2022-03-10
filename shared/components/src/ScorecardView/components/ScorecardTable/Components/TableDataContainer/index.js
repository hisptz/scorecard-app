import PropTypes from "prop-types";
import React, {memo, useEffect, useRef, useState} from "react";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {ScorecardDataEngine} from "@hisptz/scorecard-models";
import {OrgUnitLevels, ScorecardViewState} from "@hisptz/scorecard-state";
import {getLegend} from "@hisptz/scorecard-utils";
import TableCellAnalysis from "../TableCellAnalysis";
import {orgUnitOptionOnCell} from "../TableCellAnalysis/state/orgUnit";
import {cellPeriodOptionAtom} from "../TableCellAnalysis/state/period";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";
import FurtherAnalysisMenu from "./Components/FurtherAnalysisMenu";
import LoadingCell from "./Components/LoadingCell";

function DataContainer({
                           dataSources,
                           orgUnit,
                           period,
                           dataEngine,
                       }) {
    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const legendDefinitions = useRecoilValue(
        ScorecardViewState("legendDefinitions")
    );
    const {id: orgUnitId, level: dataOrgUnitLevel} = orgUnit ?? {};
    const {id: periodId} = period ?? {};
    const [analysisOpen, setAnalysisOpen] = useState(false);
    const [topData, setTopData] = useState();
    const [bottomData, setBottomData] = useState();
    const ref = useRef(null);
    const [stateActionRef, setStateActionRef] = useState(null);
    const resetPeriodsOptionSelection = useResetRecoilState(cellPeriodOptionAtom);
    const resetOrgUnitOptionSelection = useResetRecoilState(orgUnitOptionOnCell);


    const [top, bottom] = dataSources ?? [];
    const {color: topColor} =
    getLegend(topData?.current, top?.legends, {
        max: top?.weight,
        dataOrgUnitLevel,
        orgUnitLevels,
        legendDefinitions,
        period: periodId,
        orgUnit: orgUnitId,
        specificTargets: top?.specificTargets
    }) ?? {};
    const {color: bottomColor} =
    getLegend(bottomData?.current, bottom?.legends, {
        max: bottom?.weight,
        dataOrgUnitLevel,
        orgUnitLevels,
        legendDefinitions,
        period: periodId,
        orgUnit: orgUnitId,
        specificTargets: bottom?.specificTargets
    }) ?? {};

    const loading = false;

    const topKey = `${top.id}_${orgUnitId}_${periodId}`;
    const bottomKey = `${bottom?.id}_${orgUnitId}_${periodId}`;

    useEffect(() => {
        const topSub = dataEngine.get(topKey).subscribe((data) => {
            setTopData(data);
        });
        const bottomSub = dataEngine.get(bottomKey).subscribe(setBottomData);

        return () => {
            topSub.unsubscribe();
            bottomSub.unsubscribe();
            resetPeriodsOptionSelection();
            resetOrgUnitOptionSelection()
        };
    }, [orgUnitId, periodId, top, bottom,]);

    return (
        <>
            <div
                data-test={"data-cell"}
                onClick={() => {
                    setAnalysisOpen(true);
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setStateActionRef(e.target);
                }}
                ref={ref}
            >
                {loading ? (
                    <LoadingCell/>
                ) : dataSources?.length > 1 ? (
                    <LinkedDataCell
                        topIndicator={top}
                        bottomIndicator={bottom}
                        bottomData={bottomData}
                        topData={topData}
                        bottomColor={bottomColor}
                        topColor={topColor}
                    />
                ) : (
                    <SingleDataCell indicator={top} data={topData} color={topColor}/>
                )}
            </div>
            {analysisOpen && (
                <TableCellAnalysis
                    orgUnit={orgUnit}
                    period={period}
                    dataHolder={{dataSources}}
                    onClose={() => {
                        setAnalysisOpen(false);
                    }}
                />
            )}
            {stateActionRef && (
                <FurtherAnalysisMenu orgUnit={orgUnit} period={period} dataSources={dataSources}
                                     analysisOpen={analysisOpen} setAnalysisOpen={setAnalysisOpen}
                                     stateActionRef={stateActionRef} setStateActionRef={setStateActionRef}/>
            )}
        </>
    );
}


export default memo(DataContainer)

DataContainer.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    dataSources: PropTypes.array.isRequired,
    orgUnit: PropTypes.object.isRequired,
    period: PropTypes.object.isRequired,
};

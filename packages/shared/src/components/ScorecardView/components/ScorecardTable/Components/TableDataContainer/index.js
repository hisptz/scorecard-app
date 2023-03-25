import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useRecoilValue, useResetRecoilState} from "recoil";
import TableCellAnalysis from "../TableCellAnalysis";
import {orgUnitOptionOnCell} from "../TableCellAnalysis/state/orgUnit";
import {cellPeriodOptionAtom} from "../TableCellAnalysis/state/period";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";
import FurtherAnalysisMenu from "./Components/FurtherAnalysisMenu";
import LoadingCell from "./Components/LoadingCell";
import {OrgUnitLevels, ScorecardViewState} from "../../../../../../state";
import {getLegend} from "../../../../../../utils";
import {ScorecardDataEngine} from "../../../../../../models";

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
    const [stateActionRef, setStateActionRef] = useState(null);
    const resetPeriodsOptionSelection = useResetRecoilState(cellPeriodOptionAtom);
    const resetOrgUnitOptionSelection = useResetRecoilState(orgUnitOptionOnCell);

    const [tableCellRef, setTableRef] = useState();

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
        <td
            ref={setTableRef}
            className="data-cell"
            align="center"
            data-test={"data-cell"}
            style={{
                minWidth: 100
            }}
            onClick={(event) => {
                event.stopPropagation();
                setAnalysisOpen(true);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                setStateActionRef(e.target);
            }}
        >
            {loading ? (
                <LoadingCell/>
            ) : dataSources?.length > 1 ? (
                <LinkedDataCell
                    cellRef={tableCellRef}
                    topIndicator={top}
                    bottomIndicator={bottom}
                    bottomData={bottomData}
                    topData={topData}
                    bottomColor={bottomColor}
                    topColor={topColor}
                />
            ) : (
                <SingleDataCell cellRef={tableCellRef} indicator={top} data={topData} color={topColor}/>
            )}
            {analysisOpen && (
                <TableCellAnalysis
                    orgUnit={orgUnit}
                    period={period}
                    dataHolder={{dataSources}}
                    onClose={(_, event) => {
                        event.stopPropagation();
                        setAnalysisOpen(false);
                    }}
                />
            )}
            {stateActionRef && (
                <FurtherAnalysisMenu orgUnit={orgUnit} period={period} dataSources={dataSources}
                                     analysisOpen={analysisOpen} setAnalysisOpen={setAnalysisOpen}
                                     stateActionRef={stateActionRef} setStateActionRef={setStateActionRef}/>
            )}
        </td>
    );
}


export default DataContainer;

DataContainer.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    dataSources: PropTypes.array.isRequired,
    orgUnit: PropTypes.object.isRequired,
    period: PropTypes.object.isRequired,
};

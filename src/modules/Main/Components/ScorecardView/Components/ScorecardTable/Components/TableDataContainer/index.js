import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {scorecardDataEngine} from "../../../../../../../../core/state/scorecard";
import {getLegend} from "../../../../../ScoreCardManagement/Components/DataConfiguration/utils";
import TableCellAnalysis from "../TableCellAnalysis";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";
import LoadingCell from "./Components/LoadingCell";


export default function DataContainer({dataSources, orgUnitId, periodId}) {
    const [analysisOpen, setAnalysisOpen] = useState(false);
    const [topData, setTopData] = useState();
    const [bottomData, setBottomData] = useState();
    const [top, bottom] = dataSources ?? [];
    const {color: topColor} = getLegend(topData?.current, top?.legends) ?? {};
    const {color: bottomColor} = getLegend(bottomData?.current, bottom?.legends) ?? {};

    const loading = false

    const topKey = `${top.id}_${orgUnitId}_${periodId}`
    const bottomKey = `${bottom?.id}_${orgUnitId}_${periodId}`

    useEffect(() => {
        const topSub = scorecardDataEngine
            .get(topKey)
            .subscribe((data) => {
                setTopData(data)
            });
        const bottomSub = scorecardDataEngine
            .get(bottomKey)
            .subscribe(setBottomData);
        //Cleanup
        return () => {
            topSub.unsubscribe()
            bottomSub.unsubscribe();
        }
    }, [orgUnitId, periodId, top, bottom]);
    return <>
        <div onClick={() => {
            setAnalysisOpen(true)
        }
        }>
            {
                loading ? <LoadingCell/> : dataSources?.length > 1 ? (
                    <LinkedDataCell bottomData={bottomData} topData={topData} bottomColor={bottomColor}
                                    topColor={topColor}/>
                ) : (
                    <SingleDataCell data={topData} color={topColor}/>
                )
            }

        </div>
        {
            analysisOpen &&
            <TableCellAnalysis dataHolder={{dataSources}} onClose={() => {
                setAnalysisOpen(false)
            }}/>
        }
    </>
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string
};

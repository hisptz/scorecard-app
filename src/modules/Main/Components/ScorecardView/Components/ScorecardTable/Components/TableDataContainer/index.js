import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {scorecardDataEngine} from "../../../../../../../../core/state/scorecard";
import {getLegend} from "../../../../../ScoreCardManagement/Components/DataConfiguration/utils";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";
import LoadingCell from "./Components/LoadingCell";

export default function DataContainer({dataSources, orgUnitId, periodId}) {
    const [loading, setLoading] = useState();
    const [topData, setTopData] = useState();
    const [bottomData, setBottomData] = useState();
    const [top, bottom] = dataSources ?? [];
    const {color: topColor} = getLegend(topData?.current, top?.legends) ?? {};
    const {color: bottomColor} = getLegend(bottomData?.current, bottom?.legends) ?? {};


    const topKey = `${top.id}_${orgUnitId}_${periodId}`
    const bottomKey = `${bottom?.id}_${orgUnitId}_${periodId}`

    useEffect(() => {
        setLoading(true)
        const topSub = scorecardDataEngine
            .get(topKey)
            .subscribe((data)=>{
                setTopData(data)
                setLoading(false)
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

    return loading ? <LoadingCell/> : dataSources?.length > 1 ? (
        <LinkedDataCell  bottomData={bottomData} topData={topData} bottomColor={bottomColor} topColor={topColor}/>
    ) : (
        <SingleDataCell data={topData} color={topColor}/>
    );
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string
};



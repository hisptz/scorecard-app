import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {scorecardDataEngine} from "../../../../../../../../core/state/scorecard";
import {getLegend} from "../../../../../../../Admin/Components/ScoreCardManagement/Components/DataConfiguration/utils";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";
import LoadingCell from "./Components/LoadingCell";

export default function DataContainer({dataSources, orgUnitId, periodId}) {
    const [loading, setLoading] = useState(false);
    const [topData, setTopData] = useState();
    const [bottomData, setBottomData] = useState();
    const [top, bottom] = dataSources ?? [];
    const {color: topColor} = getLegend(topData?.current, top?.legends) ?? {};
    const {color: bottomColor} = getLegend(bottomData?.current, bottom?.legends) ?? {};


    const topKey = `${top.id}_${orgUnitId}_${periodId}`
    const bottomKey = `${bottom?.id}_${orgUnitId}_${periodId}`

    useEffect(() => {
        const loadingSub = scorecardDataEngine.loading$.subscribe(setLoading)
        return () => {
            loadingSub.unsubscribe();
        };
    }, [orgUnitId, periodId, top, bottom]);

    useEffect(() => {
        const topSub = scorecardDataEngine
            .get(topKey)
            .subscribe(setTopData);
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
        <LinkedDataCell bottomData={bottomData} topData={topData} bottomColor={bottomColor} topColor={topColor}/>
    ) : (
        <SingleDataCell data={topData} color={topColor}/>
    );
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string
};



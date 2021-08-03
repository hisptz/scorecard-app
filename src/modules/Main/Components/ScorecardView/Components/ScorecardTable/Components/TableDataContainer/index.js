import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import ScorecardDataEngine from "../../../../../../../../core/models/scorecardData";
import {getLegend} from "../../../../../../../Admin/Components/ScoreCardManagement/Components/DataConfiguration/utils";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";

export default function DataContainer({
                                          dataSources,
                                          orgUnitId,
                                          periodId,
                                          scorecardDataEngine,
                                      }) {
    const [topData, setTopData] = useState();
    const [bottomData, setBottomData] = useState();
    const [top, bottom] = dataSources ?? [];
    const {color: topColor} = getLegend(topData?.current, top?.legends) ?? {};
    const {color: bottomColor} = getLegend(bottomData?.current, bottom?.legends) ?? {};

    useEffect(() => {
        const topKey = `${top.id}_${orgUnitId}_${periodId}`
        const bottomKey = `${bottom?.id}_${orgUnitId}_${periodId}`
        const topSub = scorecardDataEngine
            .get(topKey)
            .subscribe(setTopData);
        const bottomSub = scorecardDataEngine
            .get(bottomKey)
            .subscribe(setBottomData);

        return () => {
            topSub.unsubscribe()
            bottomSub.unsubscribe();
        }
    }, [orgUnitId, periodId, dataSources]);

    return dataSources?.length > 1 ? (
        <LinkedDataCell bottomData={bottomData} topData={topData} bottomColor={bottomColor} topColor={topColor}/>
    ) : (
        <SingleDataCell data={topData} color={topColor}/>
    );
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string,
    scorecardDataEngine: PropTypes.instanceOf(ScorecardDataEngine)
};

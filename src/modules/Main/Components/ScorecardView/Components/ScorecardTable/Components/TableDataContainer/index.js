import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValueLoadable} from "recoil";
import {ScorecardDataStateSelector} from "../../../../../../../../core/state/scorecard";
import {getLegend} from "../../../../../../../Admin/Components/ScoreCardManagement/Components/DataConfiguration/utils";
import {LinkedDataCell, SingleDataCell} from "./Components/DataCells";
import LoadingCell from "./Components/LoadingCell";

export default function DataContainer({dataSources, orgUnitId, periodId}) {
    const [top, bottom] = dataSources ?? [];
    const topData = useRecoilValueLoadable(ScorecardDataStateSelector({
        orgUnit: orgUnitId,
        period: periodId,
        dataSource: top?.id
    }))
    const bottomData = useRecoilValueLoadable(ScorecardDataStateSelector({
        orgUnit: orgUnitId,
        period: periodId,
        dataSource: bottom?.id
    }))
    const {color: topColor} = getLegend(topData.contents?.current, top?.legends) ?? {}
    const {color: bottomColor} = getLegend(bottomData.contents?.current, bottom?.legends) ?? {}

    return (
        topData.state === 'loading' || bottomData.state === 'loading' ? <LoadingCell/> : dataSources?.length > 1 ?
            <LinkedDataCell topData={topData.contents} topColor={topColor} bottomData={bottomData.contents}
                            bottomColor={bottomColor}/> :
            <SingleDataCell data={topData.contents} color={topColor}/>
    )
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string
};



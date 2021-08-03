import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValueLoadable} from "recoil";
import {ScorecardDataStateSelector} from "../../../../../../../../core/state/scorecard";
import LinkedCellSvg from "../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import {getLegend} from "../../../../../../../Admin/Components/ScoreCardManagement/Components/DataConfiguration/utils";
import LoadingCell from "./Components/LoadingCell";

export default function DataContainer({dataSources, orgUnitId, periodId}) {
    const [top, bottom] = dataSources ?? [];
    const topData = useRecoilValueLoadable(ScorecardDataStateSelector(`${orgUnitId}-${top.id}-${periodId}`))
    const bottomData = useRecoilValueLoadable(ScorecardDataStateSelector(`${orgUnitId}-${bottom?.id}-${periodId}`))
    const {color: topColor} = getLegend(topData.contents, top?.legends) ?? {}
    const {color: bottomColor} = getLegend(bottomData.contents, bottom?.legends) ?? {}

    return (
        topData.state === 'loading' || bottomData.state === 'loading' ? <LoadingCell/> : dataSources?.length > 1 ?
            <LinkedCellSvg topValue={topData.contents} topColor={topColor} bottomValue={bottomData.contents}
                           bottomColor={bottomColor}/> :
            <SingleCellSvg value={`${topData.contents}`} color={topColor}/>
    )
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string
};



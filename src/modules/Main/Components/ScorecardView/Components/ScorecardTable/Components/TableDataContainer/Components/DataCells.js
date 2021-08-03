import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";

export function SingleDataCell({data, color}) {
    const {current, previous} = data ?? {};
    const increasing = useMemo(() => current > previous, [current, previous]);
    return (
        <SingleCellSvg status={increasing ? 'increasing' : 'decreasing'} value={`${current ?? ''}`} color={color}/>
    )
}

SingleDataCell.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string
};


export function LinkedDataCell({topData, bottomData, topColor, bottomColor}) {
    const {current: topCurrent, previous: topPrevious} = topData ?? {};
    const {current: bottomCurrent, previous: bottomPrevious} = bottomData ?? {};

    const topIncreasing = useMemo(() => topCurrent > topPrevious, [topCurrent, topPrevious]);
    const bottomIncreasing = useMemo(() => bottomCurrent > bottomPrevious, [bottomCurrent, bottomPrevious]);

    return (
        <LinkedCellSvg
            topValue={topCurrent}
            topColor={topColor}
            bottomValue={bottomCurrent}
            bottomColor={bottomColor}
            topStatus={topIncreasing ? 'increasing' : 'decreasing'}
            bottomStatus={bottomIncreasing ? 'increasing' : 'decreasing'}
        />
    )
}

LinkedDataCell.propTypes = {
    bottomData: PropTypes.object.isRequired,
    topData: PropTypes.object.isRequired,
    bottomColor: PropTypes.string,
    topColor: PropTypes.string
};




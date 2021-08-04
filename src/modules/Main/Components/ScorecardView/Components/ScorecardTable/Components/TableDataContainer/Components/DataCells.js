import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";

export function SingleDataCell({data, color}) {
    const {current, previous} = data ?? {};
    const status = useMemo(() => {
        if (current > previous) return 'increasing'
        if (current < previous) return 'decreasing'
        return null;
    }, [current, previous]);
    return (
        <SingleCellSvg status={status} value={`${current ?? ''}`} color={color}/>
    )
}

SingleDataCell.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string
};

export function LinkedDataCell({topData, bottomData, topColor, bottomColor}) {
    const {current: topCurrent, previous: topPrevious} = topData ?? {};
    const {current: bottomCurrent, previous: bottomPrevious} = bottomData ?? {};

    const topStatus = useMemo(() => {
        if (topCurrent > topPrevious) return 'increasing'
        if (topCurrent < topPrevious) return 'decreasing'
        return null;
    }, [topCurrent, topPrevious]);

    const bottomStatus = useMemo(() => {
        if (bottomCurrent > bottomPrevious) return 'increasing'
        if (bottomCurrent < bottomPrevious) return 'decreasing'
        return null
    }, [bottomCurrent, bottomPrevious]);

    return (
        <LinkedCellSvg
            topValue={topCurrent}
            topColor={topColor}
            bottomValue={bottomCurrent}
            bottomColor={bottomColor}
            topStatus={topStatus}
            bottomStatus={bottomStatus}
        />
    )
}

LinkedDataCell.propTypes = {
    bottomData: PropTypes.object.isRequired,
    topData: PropTypes.object.isRequired,
    bottomColor: PropTypes.string,
    topColor: PropTypes.string
};




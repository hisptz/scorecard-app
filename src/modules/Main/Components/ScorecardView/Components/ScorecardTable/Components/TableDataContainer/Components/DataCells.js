import {colors} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import {useRecoilValue} from "recoil";
import {ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
export function SingleDataCell({data, color}) {
    const {arrows} = useRecoilValue(ScorecardViewState('options')) ?? {}
    const {current, previous} = data ?? {};
    const increasing = useMemo(() => {
        if (arrows) {
            if (current > previous) return 'increasing'
            if (current < previous) return 'decreasing'
            return null
        }
        return null;
    }, [current, previous, arrows]);
    return (
       current ?  <SingleCellSvg status={increasing} value={`${current ?? ''}`} color={color}/>: <div style={{height: '100%', width: '100%', background: colors.grey100 }} />
    )
}

SingleDataCell.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string
};


export function LinkedDataCell({topData, bottomData, topColor, bottomColor}) {
    const {current: topCurrent, previous: topPrevious} = topData ?? {};
    const {current: bottomCurrent, previous: bottomPrevious} = bottomData ?? {};
    const {arrows} = useRecoilValue(ScorecardViewState('options')) ?? {}
    console.log(arrows)
    const topIncreasing = useMemo(() => {
        if (arrows) {
            if (topCurrent > topPrevious) return 'increasing'
            if (topCurrent < topPrevious) return 'decreasing'
        }
        return null;
    }, [topCurrent, topPrevious, arrows]);
    const bottomIncreasing = useMemo(() => {
        if (arrows) {
            if (bottomCurrent > bottomPrevious) return 'increasing'
            if (bottomCurrent < bottomPrevious) return 'decreasing'
        }
        return null
    }, [bottomCurrent, bottomPrevious, arrows]);

    return (
        (topCurrent || bottomCurrent) ?
            <LinkedCellSvg
            topValue={topCurrent}
            topColor={topColor}
            bottomValue={bottomCurrent}
            bottomColor={bottomColor}
            topStatus={topIncreasing}
            bottomStatus={bottomIncreasing}
        />: <div style={{height: '100%', width: '100%', background: colors.grey050 }} />
    )
}

LinkedDataCell.propTypes = {
    bottomData: PropTypes.object.isRequired,
    topData: PropTypes.object.isRequired,
    bottomColor: PropTypes.string,
    topColor: PropTypes.string
};




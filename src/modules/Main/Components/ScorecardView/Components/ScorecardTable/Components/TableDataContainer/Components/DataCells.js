import {colors} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {useRecoilValue} from "recoil";
import {ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import {getIncreasingStatus} from "../../../utils";


export function SingleDataCell({data, color, indicator}) {
    const {arrows} = useRecoilValue(ScorecardViewState("options")) ?? {};
    const {current, previous} = data ?? {};
    const increasing = useMemo(() => {
                const {effectiveGap, displayArrows} = indicator ?? {};
                if (arrows && displayArrows) {
                    return getIncreasingStatus(current, previous, effectiveGap);
                }
                return null;
            },
            [current, previous, arrows, indicator]
        )
    ;
    return current ? (
        <SingleCellSvg
            status={increasing}
            value={`${current ?? ""}`}
            color={color}
        />
    ) : (
        <div style={{height: 47, width: "100%", background: color}}/>
    );
}

SingleDataCell.propTypes = {
    data: PropTypes.object.isRequired,
    indicator: PropTypes.any.isRequired,
    color: PropTypes.string,
};


export function LinkedDataCell({topData, bottomData, topColor, bottomColor, topIndicator, bottomIndicator}) {
    const {current: topCurrent, previous: topPrevious} = topData ?? {};
    const {current: bottomCurrent, previous: bottomPrevious} = bottomData ?? {};
    const {arrows} = useRecoilValue(ScorecardViewState("options")) ?? {};
    const topIncreasing = useMemo(() => {
        const {effectiveGap, displayArrows} = topIndicator ?? {};
        if (arrows && displayArrows) {
            return getIncreasingStatus(topCurrent, topPrevious, effectiveGap);

        }
        return null;
    }, [topCurrent, topPrevious, arrows, topIndicator]);
    const bottomIncreasing = useMemo(() => {
        const {effectiveGap, displayArrows} = bottomIndicator ?? {};
        if (arrows && displayArrows) {
            return getIncreasingStatus(bottomCurrent, bottomPrevious, effectiveGap);
        }
        return null;
    }, [bottomCurrent, bottomPrevious, arrows, bottomIndicator]);

    return topCurrent || bottomCurrent ? (
        <LinkedCellSvg
            topValue={topCurrent}
            topColor={topColor}
            bottomValue={bottomCurrent}
            bottomColor={bottomColor}
            topStatus={topIncreasing}
            bottomStatus={bottomIncreasing}
        />
    ) : (
        <div
            style={{height: "100%", width: "100%", background: colors.grey100}}
        />
    );
}

LinkedDataCell.propTypes = {
    bottomData: PropTypes.object.isRequired,
    bottomIndicator: PropTypes.any.isRequired,
    topData: PropTypes.object.isRequired,
    topIndicator: PropTypes.any.isRequired,
    bottomColor: PropTypes.string,
    topColor: PropTypes.string,
};

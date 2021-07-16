import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import {generateRandomValues} from "../../../../../../../../../shared/utils/utils";
import {getLegend} from "../../../utils";

export default function CustomLinkedCell({top, bottom}) {
    const {legends: topLegends, showColors: showTopColors, displayArrows: topDisplayArrows} = top ?? {};
    const {legends: bottomLegends, showColors: showBottomColors, displayArrows: bottomDisplayArrows} = bottom ?? {};
    const topValue = useMemo(generateRandomValues, []);
    const bottomValue = useMemo(generateRandomValues, []);
    const {color: topColor} = getLegend(topValue, topLegends) ?? {}
    const {color: bottomColor} = getLegend(bottomValue, bottomLegends) ?? {}


    return (
        <td className='data-cell'>
            <LinkedCellSvg topStatus={topDisplayArrows && 'increasing'}
                           bottomStatus={bottomDisplayArrows && 'decreasing'} topColor={showTopColors && topColor}
                           bottomColor={showBottomColors && bottomColor}
                           bottomValue={bottomValue} topValue={topValue}/>
        </td>
    )
}

CustomLinkedCell.propTypes = {
    bottom: PropTypes.object.isRequired,
    top: PropTypes.object.isRequired,
};


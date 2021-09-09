import PropTypes from "prop-types";
import React, {useMemo} from "react";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import {generateRandomValues, getLegend} from "../../../../../../../../../shared/utils/utils";
import CustomLinkedCell from "./CustomLinkedCell";

export default function PreviewCustomCell({config}) {
    const hasLinked = config?.dataSources?.length > 1;
    const [top, bottom] = config?.dataSources ?? [];
    const {legends, showColors, id, displayArrows} = top ?? {};
    const value = useMemo(generateRandomValues, []);
    const legend = getLegend(value, legends)

    return hasLinked ? <CustomLinkedCell bottom={bottom} top={top}/> :
        <td className='data-cell' align='center'
            key={`${id}-data`} id={id}><SingleCellSvg status={displayArrows && 'decreasing'}
                                                      color={showColors ? legend?.color:undefined} value={value}/></td>
}

PreviewCustomCell.propTypes = {
    config: PropTypes.object.isRequired
};

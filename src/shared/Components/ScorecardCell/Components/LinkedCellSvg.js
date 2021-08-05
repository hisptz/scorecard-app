import PropTypes from "prop-types";
import React from "react";
import {DecreasingArrows, IncreasingArrows} from "./Arrows";


export default function LinkedCellSvg({
                                          topValue,
                                          bottomValue,
                                          topColor,
                                          bottomColor,
                                          topStatus,
                                          bottomStatus,
                                      }) {

    const width = 150;
    const height = 47;
    const fontSize = 14;
    const padding = 12;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{display: 'block'}}>
            <polygon points={`0,0 0,${height} ${width}, 0`}
                     style={{fill: topColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
            <text fontSize={fontSize} x={padding + fontSize} y={fontSize + padding}>{topValue}</text>
            {topStatus && (topStatus === 'increasing' ? <IncreasingArrows y={padding} x={padding}/> :
                <DecreasingArrows  y={padding + fontSize} x={padding}/>)}
            <polygon points={`${width},0 ${width},${height} 0,${height}`}
                     style={{fill: bottomColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
            <text fontSize={fontSize} x={width/2 + padding} y={height - padding}>{bottomValue}</text>
            {bottomStatus && (bottomStatus === 'increasing' ? <IncreasingArrows y={height - (fontSize + padding)} x={width - padding}/> :
                <DecreasingArrows y={height - padding} x={width - padding}/>)}
        </svg>
    )
}

LinkedCellSvg.propTypes = {
    bottomValue: PropTypes.any.isRequired,
    topValue: PropTypes.any.isRequired,
    bottomColor: PropTypes.string,
    bottomStatus: PropTypes.oneOf(['increasing', 'decreasing']),
    topColor: PropTypes.string,
    topStatus: PropTypes.oneOf(['increasing', 'decreasing']),

};

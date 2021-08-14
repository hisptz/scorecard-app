import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {DecreasingArrows, IncreasingArrows} from "./Arrows";


export default function LinkedCellSvg({
                                          topValue,
                                          bottomValue,
                                          topColor,
                                          bottomColor,
                                          topStatus,
                                          bottomStatus,
                                      }) {

    const width = 100;
    const height = 47;
    const fontSize=12;
    const topFontSize = useMemo(() => topValue?.length > 4 ? 12 : 14, [topValue]);
    const bottomFontSize = useMemo(() => bottomValue?.length > 4 ? 12 : 14, [bottomValue]);
    const padding = 6;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{display: 'block'}}>
            <polygon points={`0,0 0,${height} ${width}, 0`}
                     style={{fill: topColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
            <text lengthAdjust="spacingAndGlyphs" textLength={topValue?.length > 4 ? 28 : null}  fontSize={topFontSize} x={padding + fontSize} y={fontSize + padding}>{topValue}</text>
            {topStatus && (topStatus === 'increasing' ? <IncreasingArrows fontSize={fontSize} y={padding} x={padding + fontSize/2}/> :
                <DecreasingArrows fontSize={fontSize}  y={padding + fontSize} x={padding + fontSize/2}/>)}
            <polygon points={`${width},0 ${width},${height} 0,${height}`}
                     style={{fill: bottomColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
            <text lengthAdjust="spacingAndGlyphs" textLength={bottomValue?.length > 4 ? 28 : null} fontSize={bottomFontSize} x={width/2 + padding/4} y={height - padding}>{bottomValue}</text>
            {bottomStatus && (bottomStatus === 'increasing' ? <IncreasingArrows fontSize={fontSize} y={height - (fontSize + padding)} x={width - (padding + fontSize/2)}/> :
                <DecreasingArrows fontSize={fontSize} y={height - padding} x={width - (padding + fontSize/2)}/>)}
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

import PropTypes from "prop-types";
import React from "react";
import {DecreasingArrows, IncreasingArrows} from "./Arrows";



export default function LinkedCellSvg({topValue, bottomValue, topColor, bottomColor}) {

    return (
        <svg width={200} height={47} viewBox="0 0 200 47" style={{display: 'block'}}>
            <polygon points={`0,0 0,47 200, 0`}
                     style={{fill: topColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
            <text fontSize={14} x={10} y={23}>{topValue}</text>
            {/*<IncreasingArrows y={9} x={34} />*/}
            {/*<DecreasingArrows y={23} x={60}/>*/}
            <polygon points={`200,0 200,47 0,47`}
                     style={{fill: bottomColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
            <text fontSize={14} x="85%" y="75%">{bottomValue}</text>
        </svg>
    )
}

LinkedCellSvg.propTypes = {
    bottomValue: PropTypes.any.isRequired,
    topValue: PropTypes.any.isRequired,
    bottomColor: PropTypes.string,
    topColor: PropTypes.string
};

import PropTypes from "prop-types";
import React from "react";
import {DecreasingArrows, IncreasingArrows} from "./Arrows";

export default function SingleCellSvg({cellRef, color, value, status, bold}) {
    const width = cellRef?.offsetWidth - 1 || 100; //1px for the border
    const height = cellRef?.offsetHeight - 1 || 47; //1px for the border
    const fontSize = 12;
    const arrowFontSize = 10;

    const decreasing = status === "decreasing";

    return (
        <svg width={width} height={height} style={{display: "block"}}>
            <polygon
                points={`0 0 0 ${height} ${width} ${height} ${width} 0`}
                style={{fill: color ?? "#FFFFFF"}}
            />
            {status &&
                (
                    decreasing ?
                        <DecreasingArrows x={width / 2 - fontSize * 2} y={(height - arrowFontSize) / 2 + arrowFontSize}
                                          fontSize={arrowFontSize}/> :
                        <IncreasingArrows
                            fontSize={arrowFontSize}
                            y={(height - arrowFontSize) / 2}
                            x={width / 2 - fontSize * 2}
                        />
                )}
            <text
                id={"test-average-column"}
                style={{fontWeight: bold && "bold"}}
                lengthAdjust="spacingAndGlyphs"
                fontSize={fontSize}
                x={width / 2 - fontSize}
                y={(height - fontSize) / 2 + fontSize}
            >
                {value}
            </text>
        </svg>
    );
}

SingleCellSvg.propTypes = {
    value: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    color: PropTypes.string,
    status: PropTypes.oneOf(["increasing", "decreasing"]),
};

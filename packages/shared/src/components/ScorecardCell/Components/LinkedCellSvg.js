import PropTypes from "prop-types";
import React from "react";
import {DecreasingArrows, IncreasingArrows} from "./Arrows";

export default function LinkedCellSvg({
                                          bold,
                                          topValue,
                                          bottomValue,
                                          topColor,
                                          bottomColor,
                                          topStatus,
                                          bottomStatus,
                                          cellRef
                                      }) {
    const width = cellRef?.offsetWidth - 1 || 100;
    const height = cellRef?.offsetHeight - 1 || 47;
    const fontSize = 12;
    const topFontSize = 12;
    const bottomFontSize = 12;
    const padding = 6;
    const arrowFontSize = 10;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{display: "block"}}
        >
            <polygon
                points={`0,0 0,${height} ${width}, 0`}
                style={{
                    fill: topColor ?? "#FFFFFF",
                    strokeWidth: 1,
                    stroke: "rgb(232, 237, 242)",
                }}
            />
            <text
                style={{fontWeight: bold && "bold"}}
                id={"test-cell-selector"}
                lengthAdjust="spacingAndGlyphs"
                textLength={topValue?.length > 4 ? 28 : null}
                fontSize={topFontSize}
                x={padding + fontSize}
                y={fontSize + padding}
            >
                {topValue}
            </text>
            {topStatus &&
                (topStatus === "increasing" ? (
                    <IncreasingArrows
                        fontSize={arrowFontSize}
                        y={padding}
                        x={padding + fontSize / 2}
                    />
                ) : (
                    <DecreasingArrows
                        fontSize={arrowFontSize}
                        y={padding + fontSize}
                        x={padding + fontSize / 2}
                    />
                ))}
            <polygon
                points={`${width},0 ${width},${height} 0,${height}`}
                style={{
                    fill: bottomColor ?? "#FFFFFF",
                    strokeWidth: 1,
                    stroke: "rgb(232, 237, 242)",
                }}
            />
            <text
                style={{fontWeight: bold && "bold"}}
                id={"test-cell-selector"}
                lengthAdjust="spacingAndGlyphs"
                textLength={bottomValue?.length > 4 ? 28 : null}
                fontSize={bottomFontSize}
                x={width / 2 + padding}
                y={height - padding}
            >
                {bottomValue}
            </text>
            {bottomStatus &&
                (bottomStatus === "increasing" ? (
                    <IncreasingArrows
                        fontSize={arrowFontSize}
                        y={height - (fontSize + padding)}
                        x={width - (padding + fontSize / 2)}
                    />
                ) : (
                    <DecreasingArrows
                        fontSize={arrowFontSize}
                        y={height - padding}
                        x={width - (padding + fontSize / 2)}
                    />
                ))}
        </svg>
    );
}

LinkedCellSvg.propTypes = {
    bottomValue: PropTypes.any.isRequired,
    topValue: PropTypes.any.isRequired,
    bold: PropTypes.bool,
    bottomColor: PropTypes.string,
    bottomStatus: PropTypes.oneOf(["increasing", "decreasing"]),
    topColor: PropTypes.string,
    topStatus: PropTypes.oneOf(["increasing", "decreasing"]),
};

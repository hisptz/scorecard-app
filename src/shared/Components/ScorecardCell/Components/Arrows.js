import PropTypes from "prop-types";
import React from "react";


export const IncreasingArrows = ({x, y, decreasing}) => (
    <path d={`M ${x} ${y} L ${x - 7} ${y + 14} L ${x + 7} ${y + 14} Z`} fill="black" transform={decreasing && "rotate(90)"} />
)

IncreasingArrows.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    decreasing: PropTypes.bool
};

export const DecreasingArrows = ({x, y}) => (
    <path d={`M ${x} ${y} L ${x - 7} ${y - 14} L ${x + 7} ${y - 14} Z`} fill="black"/>
)

DecreasingArrows.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

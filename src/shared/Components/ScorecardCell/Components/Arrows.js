import PropTypes from "prop-types";
import React from "react";

export const IncreasingArrows = ({ x, y, decreasing, fontSize }) => (
  <path
    d={`M ${x} ${y} L ${x - fontSize / 2} ${y + fontSize} L ${
      x + fontSize / 2
    } ${y + fontSize} Z`}
    fill="black"
    transform={decreasing && "rotate(90)"}
  />
);

IncreasingArrows.propTypes = {
  fontSize: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  decreasing: PropTypes.bool,
};

export const DecreasingArrows = ({ x, y, fontSize }) => (
  <path
    d={`M ${x} ${y} L ${x - fontSize / 2} ${y - fontSize} L ${
      x + fontSize / 2
    } ${y - fontSize} Z`}
    fill="black"
  />
);

DecreasingArrows.propTypes = {
  fontSize: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

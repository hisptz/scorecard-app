import PropTypes from "prop-types";
import React, {useMemo} from "react";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import {generateRandomValues, getLegend,} from "../../../../../../../../../shared/utils/utils";

export default function CustomLinkedCell({ top, bottom }) {
  const {
    legends: topLegends,
    showColors: showTopColors,
    displayArrows: topDisplayArrows,
    weight: topWeight,
  } = top ?? {};
  const {
    legends: bottomLegends,
    showColors: showBottomColors,
    displayArrows: bottomDisplayArrows,
    weight: bottomWeight,
  } = bottom ?? {};
  const topValue = useMemo(generateRandomValues, []);
  const bottomValue = useMemo(generateRandomValues, []);
  const { color: topColor } =
    getLegend(topValue, topLegends, { max: topWeight }) ?? {};
  const { color: bottomColor } =
    getLegend(bottomValue, bottomLegends, { max: bottomWeight }) ?? {};

  return (
    <td className="data-cell">
      <LinkedCellSvg
        topStatus={topDisplayArrows && "increasing"}
        bottomStatus={bottomDisplayArrows && "decreasing"}
        topColor={showTopColors ? topColor : undefined}
        bottomColor={showBottomColors ? bottomColor : undefined}
        bottomValue={bottomValue}
        topValue={topValue}
      />
    </td>
  );
}

CustomLinkedCell.propTypes = {
  bottom: PropTypes.object.isRequired,
  top: PropTypes.object.isRequired,
};

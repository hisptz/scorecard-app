import {head, last, round} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";

export default function AverageCell({ value, bold }) {
  if (value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return (
      <td className="data-cell" align="center">
        <SingleCellSvg bold={bold} value={value ? round(value, 2) : ""} />
      </td>
    );
  }

  const values = Object.values(value);

  return (
    <td className="data-cell" align="center">
      {values.length > 1 ? (
        <LinkedCellSvg
          bold
          topValue={head(values) ? round(+head(values), 2) : ""}
          bottomValue={last(values) ? round(last(values), 2) : ""}
        />
      ) : (
        <SingleCellSvg
          bold={bold}
          value={head(values) ? round(head(values), 2) : ""}
        />
      )}
    </td>
  );
}

AverageCell.propTypes = {
  value: PropTypes.any.isRequired,
  bold: PropTypes.bool,
};

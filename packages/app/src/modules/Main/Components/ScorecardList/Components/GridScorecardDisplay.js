import PropTypes from "prop-types";
import React from "react";
import ScorecardListCard from "./Cards/ScorecardListCard";

export default function GridScorecardDisplay({ scorecards }) {
  return (
    <div
        className="scorecard-list-container grid p-32"
    >
      {scorecards?.map((scorecard) => (
        <ScorecardListCard grid key={scorecard.id} scorecard={scorecard} />
      ))}
    </div>
  );
}

GridScorecardDisplay.propTypes = {
  scorecards: PropTypes.array.isRequired,
};

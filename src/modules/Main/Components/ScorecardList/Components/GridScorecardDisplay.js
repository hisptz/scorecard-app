import PropTypes from "prop-types";
import React from "react";
import ScorecardGridCard from "./ScorecardGridCard";

export default function GridScorecardDisplay({ scorecards }) {
  return (
    <div
      data-test="scorecard-card-view"
      className="scorecard-list-container grid p-32"
    >
      {scorecards?.map((scorecard) => (
        <ScorecardGridCard key={scorecard.id} scorecard={scorecard} />
      ))}
    </div>
  );
}

GridScorecardDisplay.propTypes = {
  scorecards: PropTypes.array.isRequired,
};

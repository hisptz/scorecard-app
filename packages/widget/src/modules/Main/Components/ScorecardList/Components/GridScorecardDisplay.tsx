import PropTypes from "prop-types";
import React from "react";
import ScorecardListCard from "./Cards/ScorecardListCard";

export default function GridScorecardDisplay({ scorecards }: any) {
	return (
		<div
			data-test="scorecard-card-view"
			className="scorecard-list-container grid p-32"
		>
			{scorecards?.map((scorecard: any) => (
				<ScorecardListCard grid key={scorecard.id} scorecard={scorecard} />
			))}
		</div>
	);
}

GridScorecardDisplay.propTypes = {
	scorecards: PropTypes.array.isRequired,
};

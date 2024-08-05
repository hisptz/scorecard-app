import PropTypes from "prop-types";
import React from "react";
import ScorecardListCard from "./Cards/ScorecardListCard";

export default function ListScorecardDisplay({ scorecards }: any) {
	return (
		<div data-test="scorecard-thumbnail-view" className="column">
			{scorecards.map((scorecard: any) => (
				<ScorecardListCard scorecard={scorecard} key={scorecard?.id} />
			))}
		</div>
	);
}

ListScorecardDisplay.propTypes = {
	scorecards: PropTypes.array.isRequired,
};

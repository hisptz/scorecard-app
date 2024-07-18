import PropTypes from "prop-types";
import React from "react";
import ScorecardListCard from "./Cards/ScorecardListCard";

export default function ListScorecardDisplay({ scorecards }: any) {
	return (
		<div className="column">
			{scorecards?.map((scorecard: any) => (
				<ScorecardListCard
					scorecard={scorecard}
					key={scorecard?.id}
					grid={false}
				/>
			))}
		</div>
	);
}

ListScorecardDisplay.propTypes = {
	scorecards: PropTypes.array.isRequired,
};

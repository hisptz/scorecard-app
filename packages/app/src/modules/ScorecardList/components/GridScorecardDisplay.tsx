import React from "react";
import ScorecardListCard from "./Cards/ScorecardListCard";
import { ScorecardListItem } from "../types";

export default function GridScorecardDisplay({
												 scorecards
											 }: {
	scorecards: ScorecardListItem[];
}) {

	console.log({
		scorecards
	});
	return (
		<div className="scorecard-list-container grid p-32">
			{scorecards?.map((scorecard) => (
				<ScorecardListCard
					grid
					key={scorecard.id}
					scorecard={scorecard}
				/>
			))}
		</div>
	);
}

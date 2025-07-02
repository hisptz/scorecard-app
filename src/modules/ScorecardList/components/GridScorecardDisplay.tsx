import ScorecardListCard from "./Cards/ScorecardListCard";
import { ScorecardListItem } from "../types";

export default function GridScorecardDisplay({
	scorecards,
}: {
	scorecards: ScorecardListItem[];
}) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
			}}
			className="scorecard-list-container p-32"
		>
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

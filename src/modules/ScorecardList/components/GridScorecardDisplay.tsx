import ScorecardListCard from "./Cards/ScorecardListCard";
import { ScorecardListItem } from "../types";

export default function GridScorecardDisplay({
	scorecards,
	refetch,
}: {
	scorecards: ScorecardListItem[];
	refetch: () => void;
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
					refetch={refetch}
					grid
					key={scorecard.id}
					scorecard={scorecard}
				/>
			))}
		</div>
	);
}

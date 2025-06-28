import ScorecardListCard from "./Cards/ScorecardListCard";
import { ScorecardListItem } from "../types";

export default function ListScorecardDisplay({
	scorecards,
}: {
	scorecards: ScorecardListItem[];
}) {
	return (
		<div className="column">
			{scorecards?.map((scorecard) => (
				<ScorecardListCard
					scorecard={scorecard}
					key={scorecard?.id}
					grid={false}
				/>
			))}
		</div>
	);
}

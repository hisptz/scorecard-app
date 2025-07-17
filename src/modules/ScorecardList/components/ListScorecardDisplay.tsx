import ScorecardListCard from "./Cards/ScorecardListCard";
import { ScorecardListItem } from "../types";

export default function ListScorecardDisplay({
	scorecards,
	refetch,
}: {
	scorecards: ScorecardListItem[];
	refetch: () => void;
}) {
	return (
		<div className="column">
			{scorecards?.map((scorecard) => (
				<ScorecardListCard
					refetch={refetch}
					scorecard={scorecard}
					key={scorecard?.id}
					grid={false}
				/>
			))}
		</div>
	);
}

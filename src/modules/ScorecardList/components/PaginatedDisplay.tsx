import { ScorecardListItem } from "../types";
import { useSetting } from "@dhis2/app-service-datastore";
import GridScorecardDisplay from "./GridScorecardDisplay";
import ListScorecardDisplay from "./ListScorecardDisplay";

export default function PaginatedDisplay({
	scorecards = [],
	refetch,
}: {
	scorecards: ScorecardListItem[];
	refetch: () => void;
}) {
	const [scorecardViewType] = useSetting("scorecardViewType");

	return (
		<div className="p-16 scorecard-list">
			{scorecardViewType === "list" ? (
				<ListScorecardDisplay
					refetch={refetch}
					scorecards={scorecards}
				/>
			) : (
				<GridScorecardDisplay
					refetch={refetch}
					scorecards={scorecards}
				/>
			)}
		</div>
	);
}

import React from "react";
import { ScorecardListItem } from "../types";
import { useSetting } from "@dhis2/app-service-datastore";
import GridScorecardDisplay from "./GridScorecardDisplay";
import ListScorecardDisplay from "./ListScorecardDisplay";

export default function PaginatedDisplay({
											 scorecards = []
										 }: {
	scorecards: ScorecardListItem[];
}) {


	const [scorecardViewType] = useSetting("scorecardViewType");

	return (
		<div className="p-16 scorecard-list">
			{scorecardViewType === "list" ? (
				<ListScorecardDisplay scorecards={scorecards} />) : <GridScorecardDisplay scorecards={scorecards} />
			}
		</div>
	);
}

import { Pagination } from "@dhis2/ui";
import React from "react";
import { ScorecardListItem } from "../types";
import { useSetting } from "@dhis2/app-service-datastore";
import GridScorecardDisplay from "./GridScorecardDisplay";
import ListScorecardDisplay from "./ListScorecardDisplay";

export default function PaginatedDisplay({
	pager,
	scorecards = [],
}: {
	scorecards: ScorecardListItem[];
	pager: {
		page?: number;
		pageSize?: number;
		totalPages: number;
		total: number;
		onPageChange: (page: number) => void;
		onPageSizeChange: (size: number) => void;
	};
}) {
	const [scorecardViewType] = useSetting("scorecardViewType");

	return (
		<div className="p-16 scorecard-list">
			{scorecardViewType === "grid" && (
				<GridScorecardDisplay scorecards={scorecards} />
			)}
			{scorecardViewType === "list" && (
				<ListScorecardDisplay scorecards={scorecards} />
			)}
			{pager.totalPages > 1 && (
				<div className="p-16">
					<Pagination
						page={pager.page ?? 1}
						pageSize={pager.pageSize ?? 8}
						{...pager}
					/>
				</div>
			)}
		</div>
	);
}

import { useScorecardListData } from "../hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";
import React, { Suspense } from "react";
import { isEmpty } from "lodash";
import EmptySearchList from "./EmptySearchList";
import EmptyScoreCardList from "../../EmptyScoreCardList";
import PaginatedDisplay from "./PaginatedDisplay";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@dhis2/ui";

export function ScorecardListArea() {
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get("query");
	const { scorecards, pager, refetch, error, loading } =
		useScorecardListData();

	if (error) {
		return (
			<FullPageError error={error} resetErrorBoundary={() => refetch()} />
		);
	}

	return (
		<div style={{ gap: 16, justifyContent: "space-between", height: "100%" }} className="column ">
			<Suspense fallback={<FullPageLoader />}>
				<div style={{ flex: 1 }}>
					{
						loading ? <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
							<FullPageLoader />
						</div> : (isEmpty(scorecards) ? (
							keyword ? (
								<div className="flex-1">
									<EmptySearchList keyword={keyword} />
								</div>
							) : (
								<div className="flex-1 h-100 column center align-center">
									<EmptyScoreCardList />
								</div>
							)
						) : (
							<div className="column h-100">
								{scorecards ? (
									<PaginatedDisplay
										scorecards={scorecards}
									/>
								) : null}
							</div>
						))
					}
				</div>
				{
					(pager.totalPages > 1 && (
						<div className="p-16">
							<Pagination
								page={pager.page ?? 1}
								pageSize={pager.pageSize ?? 10}
								{...pager}
							/>
						</div>
					))
				}
			</Suspense>
		</div>
	);
}

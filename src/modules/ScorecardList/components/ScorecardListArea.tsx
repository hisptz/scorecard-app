import { useScorecardListData } from "../hooks/data";
import { FullPageError, FullPageLoader } from "../../../shared";
import { Suspense } from "react";
import { isEmpty } from "lodash";
import EmptySearchList from "./EmptySearchList";
import EmptyScoreCardList from "./EmptyScoreCardList";
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
		<div
			style={{ gap: 16, justifyContent: "space-between", height: "100%" }}
			className="column "
		>
			<Suspense fallback={<FullPageLoader />}>
				<div style={{ flex: 1 }}>
					{loading ? (
						<div
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<FullPageLoader />
						</div>
					) : isEmpty(scorecards) ? (
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
								<PaginatedDisplay scorecards={scorecards} />
							) : (
								<EmptyScoreCardList />
							)}
						</div>
					)}
				</div>
			</Suspense>
			<div className="p-16">
				<Pagination
					disabled={pager.pageCount === 1 || isEmpty(scorecards)}
					{...pager}
					pageSizes={Array.from(new Array(10).keys()).map((i) =>
						((i + 1) * 4).toString()
					)}
				/>
			</div>
		</div>
	);
}

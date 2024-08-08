import { useScorecardListData } from "../hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";
import React, { Suspense } from "react";
import { isEmpty } from "lodash";
import EmptySearchList from "./EmptySearchList";
import EmptyScoreCardList from "../../EmptyScoreCardList";
import PaginatedDisplay from "./PaginatedDisplay";
import { useSearchParams } from "react-router-dom";

export function ScorecardListArea() {
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get("query");
	const { scorecards, pager, refetch, error, loading } =
		useScorecardListData();

	if (loading) {
		return <FullPageLoader />;
	}

	if (error) {
		return (
			<FullPageError error={error} resetErrorBoundary={() => refetch()} />
		);
	}

	return (
		<Suspense fallback={<FullPageLoader />}>
			{isEmpty(scorecards) ? (
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
							pager={pager}
							scorecards={scorecards}
						/>
					) : null}
				</div>
			)}
		</Suspense>
	);
}

import i18n from "@dhis2/d2-i18n";
import { Input } from "@dhis2/ui";
import { Steps } from "intro.js-react";
import { debounce, isEmpty } from "lodash";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import EmptyScoreCardList from "../EmptyScoreCardList";
import EmptySearchList from "./Components/EmptySearchList";
import GridScorecardDisplay from "./Components/GridScorecardDisplay";
import ListScorecardDisplay from "./Components/ListScorecardDisplay";
import PaginatedDisplay from "./Components/PaginatedDisplay";
import { scorecardWidgetState } from "../../../../states/scorecard";
import { load } from "../../../../services/widget";
import {
	EngineState,
	FullPageLoader,
	HelpState,
	RouterState,
	SCORECARD_LIST_HELP_STEPS,
	ScorecardSummaryState,
	STEP_OPTIONS,
} from "@scorecard/shared";

export default function ScorecardList() {
	const setRoute = useSetRecoilState(RouterState);
	const [params, setParams] = useSearchParams();
	const dashboardItemIdParam = params.get("dashboardItemId");
	const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState);
	const navigate = useNavigate();
	const scorecardViewType: string = "list";
	const scorecards = useRecoilValue(ScorecardSummaryState);
	const currentDashboardId = useRecoilValue(scorecardWidgetState);
	const [dashboardAvailable, setDashboardAvailable] = useState(false);
	const [dashboardId, setDashboardId] = useState("");
	const setCurrentDashboardId = useSetRecoilState(scorecardWidgetState);
	const [keyword, setKeyword] = useState<any>();
	const [filteredScorecards, setFilteredScorecards] = useState<any>(scorecards);
	const [isLoading, setIsLoading] = useState(false);
	const engineState = useRecoilValue(EngineState);

	const onSearch = useRef(
		debounce((keyword) => {
			setFilteredScorecards(() => {
				return scorecards.filter(
					({ id, title, description, additionalLabels }: any) => {
						const index = `${id} ${title} ${description} ${additionalLabels?.join(
							" ",
						)}`.toLowerCase();
						return index.match(new RegExp(keyword.toLowerCase()));
					},
				);
			});
		}),
	);

	useEffect(() => {
		if (keyword) {
			onSearch.current(keyword);
		} else {
			setFilteredScorecards(scorecards);
		}
	}, [keyword, scorecards]);

	const onHelpExit = () => {
		setHelpEnabled(false);
	};

	useEffect(() => {
		setIsLoading(true);

		const dashboardItemId: any = !isEmpty(currentDashboardId)
			? currentDashboardId
			: (
					/[?&]dashboardItemId=([a-zA-Z0-9]{11})(?:&|$)/g.exec(
						window.location.search,
					) || [undefined]
			  ).pop();

		if (!isEmpty(dashboardItemId)) {
			setDashboardId(dashboardItemId);
			setCurrentDashboardId(dashboardItemId);
			load(dashboardItemId, engineState).then(({ widget }) => {
				if (widget !== undefined) {
					let scorecardId = widget["scorecardId"];
					setDashboardAvailable(true);
					setRoute((prevRoute: any) => ({ ...prevRoute, previous: `/` }));
					setIsLoading(false);
					return navigate(`/view/${scorecardId}`, { replace: true });
				} else {
					setDashboardAvailable(false);
					setIsLoading(false);
				}
			});
		} else {
			setDashboardAvailable(false);
			setIsLoading(false);
		}
	}, [dashboardId, dashboardItemIdParam]);

	return (
		<Suspense fallback={<FullPageLoader />}>
			{isLoading && <FullPageLoader />}
			<Steps
				options={STEP_OPTIONS}
				enabled={helpEnabled}
				steps={SCORECARD_LIST_HELP_STEPS}
				onExit={onHelpExit}
				initialStep={0}
			/>
			{isEmpty(scorecards) && dashboardId !== "" && !dashboardAvailable ? (
				<EmptyScoreCardList />
			) : (
				!isLoading &&
				!dashboardAvailable && (
					<div className="column h-100">
						<div className="row p-16">
							<div className="row p-45 center" style={{ paddingLeft: "25%" }}>
								<div className="column w-30">
									<Input
										className="search-input"
										value={keyword}
										onChange={({ value }: any) => {
											setKeyword(value);
										}}
										placeholder={i18n.t("Search")}
									/>
								</div>
							</div>
							<div className="w-100"></div>
						</div>
						{isEmpty(filteredScorecards) ? (
							<div className="flex-1">
								<EmptySearchList keyword={keyword} />
							</div>
						) : (
							<PaginatedDisplay
								scorecards={filteredScorecards}
								pageSize={scorecardViewType === "grid" ? 8 : 5}
								listComponent={
									scorecardViewType === "grid"
										? GridScorecardDisplay
										: ListScorecardDisplay
								}
							/>
						)}
					</div>
				)
			)}
		</Suspense>
	);
}
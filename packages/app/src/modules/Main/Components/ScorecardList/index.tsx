import { useAlert } from "@dhis2/app-runtime";
import { useSetting } from "@dhis2/app-service-datastore";
import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, DropdownButton, Input, Tooltip } from "@dhis2/ui";
import {
	IconAdd24,
	IconList24,
	IconQuestionFilled24,
	IconApps24,
} from "@dhis2/ui-icons";
import {
	FullPageLoader,
	HelpState,
	RouterState,
	SCORECARD_LIST_HELP_STEPS,
	ScorecardIdState,
	ScorecardSummaryState,
	STEP_OPTIONS,
} from "@scorecard/shared";
import { Steps } from "intro.js-react";
import { debounce, isEmpty } from "lodash";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";
import EmptyScoreCardList from "../EmptyScoreCardList";
import { steps } from "../ScoreCardManagement/state/pages";
import EmptySearchList from "./Components/EmptySearchList";
import GridScorecardDisplay from "./Components/GridScorecardDisplay";
import HelpMenu from "./Components/HelpMenu";
import ListScorecardDisplay from "./Components/ListScorecardDisplay";
import PaginatedDisplay from "./Components/PaginatedDisplay";

export default function ScorecardList() {
	const resetScorecardIdState = useResetRecoilState(ScorecardIdState);
	const setRoute = useSetRecoilState(RouterState);
	const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState);
	const navigate = useNavigate();
	const [scorecardViewType, { set }] = useSetting("scorecardViewType");
	const scorecards: any = useRecoilValue(ScorecardSummaryState);
	const [keyword, setKeyword] = useState();
	const [filteredScorecards, setFilteredScorecards] = useState(scorecards);
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 }),
	);

	const onViewChange = () => {
		try {
			if (scorecardViewType === "grid") {
				set("list");
				return;
			}
			set("grid");
		} catch (e) {
			show({
				message: e.message ?? e.toString(),
				type: { critical: true },
			});
		}
	};

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

	const onAddClick = () => {
		const initialStep = steps[0].id;
		resetScorecardIdState();
		setRoute((prevRoute: any) => ({ ...prevRoute, previous: `/` }));
		navigate(`/add/${initialStep}`);
	};

	const onHelpExit = () => {
		setHelpEnabled(false);
	};

	return (
		<Suspense fallback={<FullPageLoader />}>
			<Steps
				options={STEP_OPTIONS}
				enabled={helpEnabled}
				steps={SCORECARD_LIST_HELP_STEPS}
				onExit={onHelpExit}
				initialStep={0}
			/>
			{isEmpty(scorecards) ? (
				<EmptyScoreCardList />
			) : (
				<div className="column h-100">
					<div className="row p-16">
						<div className="row p-45 center" style={{ paddingLeft: "35%" }}>
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
						<div className="w-100">
							<ButtonStrip end>
								<DropdownButton
									type="button"
									component={<HelpMenu />}
									icon={<IconQuestionFilled24 />}
								>
									{i18n.t("Help")}
								</DropdownButton>
								<Tooltip
									content={i18n.t("Switch to {{viewType}} view", {
										viewType:
											scorecardViewType === "grid"
												? i18n.t("list")
												: i18n.t("grid"),
									})}
								>
									<Button
										onClick={onViewChange}
										className="change-view-button"
										dataTest="scorecard-view-orientation"
										icon={
											scorecardViewType === "grid" ? (
												<IconList24 />
											) : (
												<IconApps24 />
											)
										}
									/>
								</Tooltip>
								<Button
									dataTest="new-scorecard-button"
									className="add-scorecard-button"
									onClick={onAddClick}
									primary
									icon={<IconAdd24 />}
								>
									{i18n.t("Add New Scorecard")}
								</Button>
							</ButtonStrip>
						</div>
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
			)}
		</Suspense>
	);
}
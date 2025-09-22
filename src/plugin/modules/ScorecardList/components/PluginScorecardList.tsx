import { useScorecardListData } from "@/modules/ScorecardList/hooks/data";
import i18n from "@dhis2/d2-i18n";
import { useRef, useState } from "react";
import { Button, Checkbox, CircularLoader, IconVisualizationPivotTable24, Menu, MenuItem } from "@dhis2/ui";
import illustration from "../../../../assets/images/scorecard_illustration.png";
import { usePluginConfig } from "../../../components/PluginConfigProvider";
import { useNavigate } from "react-router-dom";
import { useManagePluginConfig } from "../../../hooks/config";
import { FullPageError } from "../../../../shared";
import { SearchArea } from "@/modules/ScorecardList/components/SearchArea";
import { isEmpty } from "lodash";
import { EmptyScorecardList } from "@/plugin/modules/ScorecardList/components/EmptyScorecardList";
import { FullPageLoader } from "@/shared";
import { useResizeObserver } from "usehooks-ts";

export function PluginScorecardList() {
	const ref = useRef<HTMLDivElement>(null);
	const { height } = useResizeObserver({
		ref
	});
	const { loading, scorecards, error, refetch, called } = useScorecardListData();
	const {
		props: { dashboardItemId }
	} = usePluginConfig();
	const { addConfig, loading: saving } =
		useManagePluginConfig(dashboardItemId);
	const navigate = useNavigate();
	const [selectedScorecard, setSelectedScorecard] = useState<
		string | undefined
	>(undefined);

	if (error) {
		return <FullPageError error={error} resetErrorBoundary={refetch} />;
	}

	if (loading && !called) {
		return <FullPageLoader />;
	}

	const isChecked = (scorecardId: string) =>
		scorecardId === selectedScorecard;

	const onSelect = async () => {
		if (selectedScorecard) {
			await addConfig({
				scorecardId: selectedScorecard,
				dashboardItemId
			});
			navigate(`${selectedScorecard}`);
		}
	};
	return (
		<div
			className="w-full h-full items-center justify-center p-4 gap-2 flex flex-col"
		>
			<img
				width="auto"
				src={illustration}
				className="h-[160px]"
				alt="scorecard-illustration"
			/>
			{
				isEmpty(scorecards) && !loading ? <EmptyScorecardList /> : <>
					<h1 className="font-bold text-2xl">{i18n.t("Select a scorecard")}</h1>
					<div
						ref={ref}
						className="md:w-2/3 w-full lg:w-1/2 xl:w-1/3 p-2 gap-4 flex overflow-hidden flex-1 flex-col"
					>
						{!loading && <SearchArea />}
						{
							loading ? <div className="h-full flex-1 w-full flex items-center justify-center">
								<CircularLoader small />
							</div> : <Menu className={`overflow-auto h-[${height?.toFixed(0) ?? 140 - 40}px]`}>
								{scorecards.map((scorecard) => (
									<MenuItem
										key={scorecard.id}
										active={isChecked(scorecard.id)}
										icon={<IconVisualizationPivotTable24 />}
										onClick={() => {
											if (isChecked(scorecard.id)) {
												setSelectedScorecard(undefined);
											} else {
												setSelectedScorecard(scorecard.id);
											}
										}}
										suffix={
											<Checkbox
												onChange={({ checked }) => {
													if (checked) {
														setSelectedScorecard(scorecard.id);
													} else {
														setSelectedScorecard(undefined);
													}
												}}
												checked={scorecard.id === selectedScorecard}
											/>
										}
										checkbox
										label={scorecard.title}
										value={scorecard.id}
									/>
								))}
							</Menu>
						}
					</div>
					<Button
						loading={saving}
						onClick={onSelect}
						primary
						disabled={selectedScorecard === undefined}
					>
						{saving ? i18n.t("Saving...") : i18n.t("Select scorecard")}
					</Button>
				</>
			}
		</div>
	);
}

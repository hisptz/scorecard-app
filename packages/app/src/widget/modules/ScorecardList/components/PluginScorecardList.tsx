import { useScorecardListData } from "../../../../modules/ScorecardList/hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";
import { isEmpty } from "lodash";
import { EmptyScorecardList } from "./EmptyScorecardList";
import i18n from "@dhis2/d2-i18n";
import { useState } from "react";
//@ts-expect-error missing type export
import { Button, Checkbox, colors, IconVisualizationPivotTable24, Menu, MenuItem } from "@dhis2/ui";
import illustration from "../../../../assets/images/scorecard_illustration.png";
import { usePluginConfig } from "../../../components/PluginConfigProvider";
import { useNavigate } from "react-router-dom";
import { useManagePluginConfig } from "../../../hooks/config";


export function PluginScorecardList() {
	const { loading, scorecards, error, refetch } = useScorecardListData();
	const { props: { dashboardItemId } } = usePluginConfig();
	const { addConfig } = useManagePluginConfig(dashboardItemId);
	const navigate = useNavigate();
	const [selectedScorecard, setSelectedScorecard] = useState<string | undefined>(undefined);

	if (loading) {
		return (<FullPageLoader small />);
	}

	if (error) {
		return (
			<FullPageError error={error} resetErrorBoundary={refetch} />
		);
	}

	if (isEmpty(scorecards)) {
		return (
			<EmptyScorecardList />
		);
	}

	const isChecked = (scorecardId: string) => scorecardId === selectedScorecard;

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
		<div style={{
			width: "100%",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
			display: "flex",
			flexDirection: "column",
			gap: 16
		}}>
			<img width="auto" height={100} src={illustration} alt="scorecard-illustration" />
			<h1>{i18n.t("Select a scorecard")}</h1>
			<div style={{ width: "100%", maxHeight: "80dvh", maxWidth: 600, padding: 8, borderRadius: 4, border: `1px solid ${colors.grey800}`, overflow: "auto" }}>
				<Menu>
					{
						scorecards.map(scorecard => (<MenuItem active={isChecked(scorecard.id)} icon={<IconVisualizationPivotTable24 />} onClick={() => {
							if (isChecked(scorecard.id)) {
								setSelectedScorecard(undefined);
							} else {
								setSelectedScorecard(scorecard.id);
							}
						}} suffix={<Checkbox onChange={(({ checked }) => {
							if (checked) {
								setSelectedScorecard(scorecard.id);
							} else {
								setSelectedScorecard(undefined);
							}
						})} checked={scorecard.id === selectedScorecard} />} checkbox label={scorecard.title} value={scorecard.id} />))
					}
				</Menu>
			</div>
			<Button onClick={onSelect} primary disabled={selectedScorecard === undefined}>{i18n.t("Select scorecard")}</Button>
		</div>
	);
}


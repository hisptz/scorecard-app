import { useScorecardListData } from "../../../../modules/ScorecardList/hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";
import { isEmpty } from "lodash";
import { EmptyScorecardList } from "./EmptyScorecardList";
import i18n from "@dhis2/d2-i18n";
import { useState } from "react";
// @ts-ignore
import { Button, Checkbox, colors, IconVisualizationPivotTable24, Menu, MenuItem } from "@dhis2/ui";
import illustration from "../../../../assets/images/scorecard_illustration.png";


export function WidgetScorecardList() {
	const { loading, scorecards, error, refetch } = useScorecardListData();
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
			<h1>{i18n.t("Select the scorecard to show in this widget")}</h1>
			<div style={{ width: "100%", maxWidth: 600 }}>
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
			<Button primary disabled={selectedScorecard === undefined}>{i18n.t("Select scorecard")}</Button>
		</div>
	);
}

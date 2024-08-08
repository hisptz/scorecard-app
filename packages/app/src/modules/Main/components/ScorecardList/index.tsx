import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, DropdownButton, Tooltip } from "@dhis2/ui";
import {
	IconAdd24,
	IconApps24,
	IconList24,
	IconQuestionFilled24,
} from "@dhis2/ui-icons";
import { SCORECARD_LIST_HELP_STEPS, STEP_OPTIONS } from "@scorecard/shared";
import { Steps } from "intro.js-react";
import React, { useState } from "react";
import HelpMenu from "./components/HelpMenu";
import { SearchArea } from "./components/SearchArea";
import { useSetting } from "@dhis2/app-service-datastore";
import { useAlert } from "@dhis2/app-runtime";
import { useNavigate } from "react-router-dom";
import { ScorecardListArea } from "./components/ScorecardListArea";

export default function ScorecardList() {
	const [scorecardViewType, { set }] = useSetting("scorecardViewType");
	const [helpEnabled, setHelpEnabled] = useState<boolean>(false);
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
		} catch (e: any) {
			show({
				message: e.message ?? e.toString(),
				type: { critical: true },
			});
		}
	};
	const navigate = useNavigate();

	const onAddClick = () => {
		navigate(`/add`);
	};

	const onHelpExit = () => {
		setHelpEnabled(false);
	};

	return (
		<>
			<Steps
				options={STEP_OPTIONS}
				enabled={helpEnabled}
				steps={SCORECARD_LIST_HELP_STEPS}
				onExit={onHelpExit}
				initialStep={0}
			/>
			<div className="column h-100">
				<div className="row p-16">
					<div
						className="row p-45 center"
						style={{ paddingLeft: "35%" }}
					>
						<div className="column w-30">
							<SearchArea />
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
				<div className="flex-1">
					<ScorecardListArea />
				</div>
			</div>
		</>
	);
}

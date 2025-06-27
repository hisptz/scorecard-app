import React from "react";
import i18n from "@dhis2/d2-i18n";
import { OldScorecardList } from "./components/OldScorecardList";
import { Button, IconArrowLeft24 } from "@dhis2/ui";
import { useNavigate } from "react-router-dom";

export default function ScorecardMigration() {
	const navigate = useNavigate();
	return (
		<div className="column h-100 w-100 p-32 gap-24">
			<div>
				<Button onClick={() => navigate(-1)} icon={<IconArrowLeft24 />}>
					{i18n.t("Back")}
				</Button>
			</div>
			<div>
				<h2>{i18n.t("Scorecards to migrate")}</h2>
				<span>{i18n.t("Select the scorecards configuration that you would like to migrate")}</span>
			</div>
			<OldScorecardList />
		</div>
	);
}

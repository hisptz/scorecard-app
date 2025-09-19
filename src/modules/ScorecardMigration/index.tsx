import React from "react";
import i18n from "@dhis2/d2-i18n";
import { OldScorecardList } from "./components/OldScorecardList";
import { Button, IconArrowLeft24 } from "@dhis2/ui";
import { useNavigate } from "react-router-dom";

export default function ScorecardMigration() {
	const navigate = useNavigate();
	return (
		<div style={{
			height: "calc(100dvh - 48px)",
			maxHeight: "calc(100davh - 48px)"
		}} className="flex flex-col w-full h-full p-16 gap-8">
			<div>
				<Button onClick={() => navigate(-1)} icon={<IconArrowLeft24 />}>
					{i18n.t("Back")}
				</Button>
			</div>
			<div className="gap-2 flex flex-col">
				<h2 className="font-bold text-2xl">{i18n.t("Scorecards to migrate")}</h2>
				<span>{i18n.t("Select the scorecards configuration that you would like to migrate")}</span>
			</div>
			<div className="flex-1">
				<OldScorecardList />
			</div>
		</div>
	);
}

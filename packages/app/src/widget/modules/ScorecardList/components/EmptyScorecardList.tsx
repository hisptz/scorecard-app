import illustration from "../../../../assets/images/scorecard_illustration.png";
import i18n from "@dhis2/d2-i18n";
import { useConfig } from "@dhis2/app-runtime";
import { Button, IconLaunch24 } from "@dhis2/ui";

export function EmptyScorecardList() {
	const config = useConfig();

	const appURL = `${config.baseUrl}/api/apps/hisptz-scorecard/index.html`;
	console.log(config);

	return (
		<div style={{
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			padding: 16,
			gap: 16
		}}>
			<img width="auto" height={160} src={illustration} alt="scorecard-illustration" />
			<div style={{ textAlign: "center" }}>
				<h1 style={{ margin: 4, fontSize: "2rem" }}>{i18n.t("Welcome to the scorecard plugin")}</h1>
				<span>{i18n.t("It seems you do not have any scorecards configured. Create a scorecard first in the Interactive scorecard app first.")}</span>
			</div>
			<Button icon={<IconLaunch24 />} primary onClick={() => {
				window.open(appURL, "_blank", "noopener,noreferrer");
			}}>{i18n.t("Go to scorecard app")}</Button>
		</div>
	);
}

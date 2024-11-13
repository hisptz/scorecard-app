import { WidgetScorecardList } from "./components/WidgetScorecardList";

export function ScorecardList() {

	return (
		<div style={{
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 16
		}}>
			<WidgetScorecardList />
		</div>
	);

}

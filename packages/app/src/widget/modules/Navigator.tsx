import { ScorecardList } from "./ScorecardList";
import { usePluginConfig } from "../components/PluginConfigProvider";
import { ScorecardView } from "./ScorecardView/ScorecardView";

export function WidgetNavigator() {
	const { scorecardId } = usePluginConfig();

	if (scorecardId) {
		return <ScorecardView />;
	}

	return (
		<ScorecardList />
	);
}

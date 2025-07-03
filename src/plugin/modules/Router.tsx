import { HashRouter, Route, Routes } from "react-router-dom";
import { ScorecardList } from "./ScorecardList";
import { ScorecardView } from "./ScorecardView/ScorecardView";
import { PluginConfigProvider } from "../components/PluginConfigProvider";
import { PluginProps } from "../types";

export function WidgetRouter({ props }: { props: PluginProps }) {
	return (
		<HashRouter>
			<PluginConfigProvider props={props}>
				<Routes>
					<Route path="/" index Component={ScorecardList} />
					<Route path="/:id" index Component={ScorecardView} />
				</Routes>
			</PluginConfigProvider>
		</HashRouter>
	);
}

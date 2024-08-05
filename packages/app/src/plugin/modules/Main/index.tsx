import React from "react";
import ScorecardList from "./Components/ScorecardList";
import ScorecardWidgetMigration from "./Components/ScorecardWidgetMigration/index";

export default function Main() {
	ScorecardWidgetMigration();
	return <ScorecardList />;
}

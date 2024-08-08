import React from "react";
import ScorecardList from "./components/ScorecardList";
import { useAutoMigration } from "./hooks/autoMigration";

export default function Main() {
	useAutoMigration();
	return <ScorecardList />;
}

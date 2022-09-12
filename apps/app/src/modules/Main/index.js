import React from "react";
import ScorecardList from "./Components/ScorecardList";
import {useAutoMigration} from "./hooks/autoMigration";

export default function Main() {
    useAutoMigration();
    return (
        <ScorecardList/>
    )
}

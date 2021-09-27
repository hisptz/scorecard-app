import React, { useState } from "react";
import ScorecardList from "./Components/ScorecardList";
import ScorecardMigration from "./Components/ScorecardMigration";

export default function Main() {
  const [migrationComplete, setMigrationComplete] = useState(false);
  return migrationComplete ? (
    <ScorecardList />
  ) : (
    <ScorecardMigration onMigrationComplete={setMigrationComplete} />
  );
}

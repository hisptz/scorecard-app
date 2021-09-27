import React from "react";
import LayoutSelector from "./Components/LayoutSelector";
import OrgUnitSelector from "./Components/OrgUnitSelector";
import PeriodSelector from "./Components/PeriodSelector";

export default function DimensionsSelector() {
  return (
    <div className="row space-between">
      <OrgUnitSelector />
      <PeriodSelector />
      <LayoutSelector />
    </div>
  );
}

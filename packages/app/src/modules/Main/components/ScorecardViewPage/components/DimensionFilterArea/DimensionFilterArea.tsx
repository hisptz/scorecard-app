import React from "react";
import { Card } from "@dhis2/ui";
import classes from "./DimensionFilterArea.module.css";
import { OrgUnitDimensionSelection } from "./components/CustomOrgUnitSelectorModal";
import { PeriodDimensionSelector } from "./components/PeriodDimensionSelector";

export function DimensionFilterArea() {
	return (
		<div className={classes["selection-card"]}>
			<Card>
				<div className="row space-between align-center ph-16">
					<div className="row align-items-center">
						<OrgUnitDimensionSelection />
						<PeriodDimensionSelector />
					</div>
				</div>
			</Card>
		</div>
	);
}

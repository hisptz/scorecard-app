import React from "react";
import { Card } from "@dhis2/ui";
import classes from "./DimensionFilterArea.module.css";
import { OrgUnitDimensionSelection } from "./components/CustomOrgUnitSelectorModal";
import { PeriodDimensionSelector } from "./components/PeriodDimensionSelector";
import { BackButton } from "./components/BackButton";
import { HelpButton } from "./components/HelpButton";
import { SCORECARD_VIEW_HELP_STEPS } from "@/shared";

export function DimensionFilterArea() {


	return (
		<div className={classes["selection-card"]}>
			<Card>
				<div
					style={{ padding: "0 16px" }}
					className="row space-between align-items-center ph-16"
				>
					<div className="row align-items-center">
						<OrgUnitDimensionSelection />
						<PeriodDimensionSelector />
					</div>
					<div
						style={{ gap: 8, justifyContent: "flex-end" }}
						className="row align-items-center"
					>
						<BackButton />
						<HelpButton steps={SCORECARD_VIEW_HELP_STEPS} />
					</div>
				</div>
			</Card>
		</div>
	);
}

import { ACCESS_HELP_STEPS, Help } from "@scorecard/shared";
import React from "react";
import OrgUnit from "./components/OrgUnitFilter";
import Sharing from "./components/Sharing";

export default function AccessScorecardForm() {
	return (
		<div
			style={{ width: "100%", height: "100%" }}
			className="container p-16"
		>
			<Help helpSteps={ACCESS_HELP_STEPS} />
			<div className="row">
				<div className="column">
					<OrgUnit />
				</div>
				<div className="column">
					<Sharing />
				</div>
			</div>
		</div>
	);
}

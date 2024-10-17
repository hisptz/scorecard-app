import { isEmpty } from "lodash";
import Instructions from "../../../../Instructions";
import DataSourceConfiguration from "../../DataSourceConfiguration";
import React from "react";
import { useWatch } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";


export function InstructionArea() {
	const groups = useWatch<ScorecardConfig>({
		name: "dataSelection.dataGroups"
	});

	return (
		<div className="column h-100">
			{isEmpty(groups) ? (
				<div style={{ margin: "auto" }}>
					<Instructions />
				</div>
			) : (
				<DataSourceConfiguration />
			)}
		</div>
	);
}

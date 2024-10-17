import PreviewScorecardTable from "../../../../PreviewScorecardTable";
import React from "react";
import { useWatch } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { isEmpty } from "lodash";


export function PreviewArea() {
	const groups = useWatch<ScorecardConfig>({
		name: "dataSelection.dataGroups"
	});

	if (isEmpty(groups)) {
		return null;
	}

	return (
		<div className="row pb-16">
			<div className="column preview-table-area">
				<PreviewScorecardTable />
			</div>
		</div>
	);
}

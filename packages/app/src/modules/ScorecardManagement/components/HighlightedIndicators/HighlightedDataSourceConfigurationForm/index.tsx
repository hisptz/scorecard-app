import { Help, INDICATOR_CONFIGURATION_STEPS, ScorecardConfigEditState } from "@scorecard/shared";
import React from "react";
import { useRecoilValue } from "recoil";
import DataSourceConfigurationForm from "../../DataConfiguration/components/DataSourceConfigurationForm";

export default function HighlightedDataSourceConfigurationForm() {
	const { selectedHighlightedIndicatorIndex } =
		useRecoilValue(ScorecardConfigEditState) ?? {};

	const path = `highlightedIndicators.${selectedHighlightedIndicatorIndex}`;

	return !isNaN(selectedHighlightedIndicatorIndex) ? (
		<div className="container-bordered">
			<Help helpSteps={INDICATOR_CONFIGURATION_STEPS} />
			<DataSourceConfigurationForm path={path} />
		</div>
	) : null;
}

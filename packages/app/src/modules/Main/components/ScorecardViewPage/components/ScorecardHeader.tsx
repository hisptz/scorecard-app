import JsxParser from "react-jsx-parser";
import { head } from "lodash";
import { colors } from "@dhis2/ui";
import { useMemo } from "react";
import { PeriodUtility } from "@hisptz/dhis2-utils";
import { useScorecardConfig, useScorecardState } from "@hisptz/dhis2-analytics";

export function ScorecardHeader() {
	const config = useScorecardConfig();
	const { customHeader, title, subtitle, periodSelection } = config ?? {};
	const periods = periodSelection.periods ?? [];

	const state = useScorecardState();

	const period = useMemo(() => {
		if (periods.length > 1) {
			return;
		}
		return PeriodUtility.getPeriodById(head(periods)?.id as string);
	}, [periods]);

	if (!state.options.title) {
		return null;
	}

	return (
		<div className="row space-between" id={"scorecard-header"}>
			<div className="row">
				{customHeader ? (
					/*
      // @ts-ignore */
					<JsxParser
						autoCloseVoidElements
						className="w-100"
						onError={console.error}
						bindings={{
							title,
							subtitle,
							period: periods.length === 1 ? period?.name : ""
						}}
						jsx={customHeader}
					/>
				) : (
					<div className="column center align-items-center">
						<h1
							style={{ margin: 8 }}
							id={"data-test-score-card-title"}
						>
							{title}{" "}
							{`${periods.length === 1 ? ` - ${period?.name}` : ""}`}
						</h1>
						<h3 style={{ color: colors.grey600, margin: 0 }}>
							{subtitle}
						</h3>
					</div>
				)}
			</div>
		</div>
	);
}

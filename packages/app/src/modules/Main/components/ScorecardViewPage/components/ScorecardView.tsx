import { Scorecard, ScorecardConfig, useScorecardState } from "@hisptz/dhis2-analytics";
import { useDimensions } from "../hooks/dimensions";
import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageError } from "@scorecard/shared";

export interface ScorecardViewProps {
	config: ScorecardConfig;
}

export function ScorecardView() {
	const { noDimensionsSelected } = useDimensions();
	const state = useScorecardState();

	if (noDimensionsSelected) {
		return (
			<div className="h-100 w-100 column align-items-center justify-content-center">
				<span
					style={{
						color: colors.grey700,
						fontWeight: "bold",
						fontSize: 24
					}}
				>
					{i18n.t(
						"Select organisation unit and period to view scorecard"
					)}
				</span>
			</div>
		);
	}

	return (
		<ErrorBoundary
			resetKeys={[state, noDimensionsSelected]}
			FallbackComponent={FullPageError}
		>
			<div
				style={{ padding: 16, width: "100%" }}
				className="h-100 w-100 column align-items-center"
			>
				<Scorecard
					tableProps={{
						width: "100%",
						scrollWidth: "100%"
					}}
				/>
			</div>
		</ErrorBoundary>
	);
}

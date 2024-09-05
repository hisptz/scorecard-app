import { Scorecard, useScorecardState } from "@hisptz/dhis2-analytics";
import { useApplyDimensions, useRawDimensions, useSetInitialDimensions } from "../hooks/dimensions";
import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageError } from "@scorecard/shared";
import { useResizeObserver } from "usehooks-ts";
import { useRef } from "react";

export function ScorecardView() {
	const ref = useRef<HTMLDivElement | null>(null);
	const { height } = useResizeObserver({
		ref
	});
	const { noDimensionsSelected } = useRawDimensions();
	const state = useScorecardState();

	useSetInitialDimensions();
	useApplyDimensions();

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
				ref={ref}
				style={{ padding: 16, width: "100%", height: "100%" }}
				className="w-100 column"
			>
				<Scorecard
					tableProps={{
						scrollHeight: height ? `${height}px` : "100%",
						scrollWidth: "100%"
					}}
				/>
			</div>
		</ErrorBoundary>
	);
}

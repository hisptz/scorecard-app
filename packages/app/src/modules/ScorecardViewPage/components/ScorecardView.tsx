import { Scorecard, useScorecardState } from "@hisptz/dhis2-analytics";
import { useApplyDimensions, useRawDimensions, useSetInitialDimensions } from "../hooks/dimensions";
import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageError } from "@scorecard/shared";
import { useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export function ScorecardView({ headerHeight }: { headerHeight?: number }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { noDimensionsSelected } = useRawDimensions();
	const state = useScorecardState();
	const { width = 0, height = 0 } = useWindowSize();

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
				style={{ padding: 16, width: "100%", height: "100%", position: "relative" }}
				className="w-100 column"
			>
				<Scorecard
					tableProps={{
						scrollWidth: `${width - 32}px`,
						scrollHeight: `${height - ((headerHeight ?? 300) + 96 + (16 * 2))}px`
					}}
				/>
			</div>
		</ErrorBoundary>
	);
}

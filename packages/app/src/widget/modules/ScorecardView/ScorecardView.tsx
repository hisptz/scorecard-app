import { FullPageError, FullPageLoader } from "@scorecard/shared";
import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { usePluginScorecardConfig } from "../../hooks/scorecard";
import { ScorecardContext, ScorecardDataProvider, ScorecardHeader, ScorecardLegendsView, ScorecardStateProvider } from "@hisptz/dhis2-scorecard";
import { ScorecardTable } from "./ScorecardTable";


export function ScorecardView() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { loading, config, error, refetch } = usePluginScorecardConfig();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const { height: headerHeight } = useResizeObserver<HTMLDivElement>({
		box: "border-box",
		ref: headerRef
	});
	const { height: containerHeight, width: containerWidth } = useResizeObserver({
		ref: containerRef
	});

	if (loading) {
		return (
			<FullPageLoader />
		);
	}

	if (error) {
		return (
			<FullPageError error={error} resetErrorBoundary={refetch} />
		);
	}

	if (!config) {
		return (
			<FullPageError error={Error("Missing valid configuration")} resetErrorBoundary={refetch} />
		);
	}

	return (
		<div ref={containerRef} style={{ height: "100%", width: "100%" }}>
			<ScorecardStateProvider config={config!}>
				<ScorecardContext config={config!}>
					<ScorecardDataProvider>
						<div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
							<div ref={headerRef} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
								<ScorecardHeader />
								<ScorecardLegendsView />
							</div>
							<div style={{ flex: 1, gap: 16 }}>
								<ScorecardTable containerWidth={containerWidth!} headerHeight={headerHeight!} containerHeight={containerHeight!} />
							</div>
						</div>
					</ScorecardDataProvider>
				</ScorecardContext>
			</ScorecardStateProvider>
		</div>
	);
}

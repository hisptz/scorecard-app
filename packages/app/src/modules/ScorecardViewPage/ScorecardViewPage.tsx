import { DimensionFilterArea } from "./components/DimensionFilterArea";
import { useScorecardConfigFromServer } from "./hooks/data";
import { FullPageError, FullPageLoader, getOrgUnitSelectionFromIds } from "@scorecard/shared";
import { ScorecardActions } from "./components/ScorecardActions/ScorecardActions";
import { ScorecardView } from "./components/ScorecardView";
import { ScorecardHeader } from "./components/ScorecardHeader";
import { ScorecardLegendsView } from "./components/ScorecardLegendsView";
import { ScorecardContext, ScorecardState } from "@hisptz/dhis2-analytics";
import { useRawDimensions } from "./hooks/dimensions";
import { useMemo, useRef } from "react";
import { isEmpty } from "lodash";
import { useResizeObserver } from "usehooks-ts";
import { DimensionsNotSet } from "./components/DimensionsNotSet";

export function ScorecardViewPage() {
	const { periods, orgUnits } = useRawDimensions();
	const { config, loading, error, refetch } = useScorecardConfigFromServer();

	const headerRef = useRef<HTMLDivElement | null>(null);

	const { height } = useResizeObserver<HTMLDivElement>({
		box: "border-box",
		ref: headerRef
	});

	const initialState = useMemo(() => {
		if (!config) {
			return;
		}
		const periodSelection = !isEmpty(periods) ? {
			periods: periods.map((periodId) => ({ id: periodId }))
		} : config?.periodSelection;
		const orgUnitSelection = !isEmpty(orgUnits) ? getOrgUnitSelectionFromIds(orgUnits) : config?.orgUnitSelection;

		return {
			options: config.options,
			orgUnitSelection,
			periodSelection
		} as ScorecardState;

	}, [periods, orgUnits, config]);

	if (loading || !initialState) {
		return (
			<FullPageLoader />
		);
	}
	if (error) {
		return (
			<FullPageError
				error={error}
				resetErrorBoundary={() => {
					refetch();
				}}
			/>
		);
	}
	if (!config) {
		return (
			<FullPageError
				resetErrorBoundary={() => {
					refetch();
				}}
				error={Error("Could not get information about the scorecard")}
			/>
		);
	}

	const dimensionNotSet = isEmpty(periods) || isEmpty(orgUnits);

	return (
		<div
			style={{
				width: "100dvw",
				height: "100dvh",
				display: "flex",
				flexDirection: "column",
				gap: 16
			}}
		>
			<DimensionFilterArea />
			{
				dimensionNotSet ? <DimensionsNotSet /> : <ScorecardContext initialState={initialState} config={config}>
					<div ref={headerRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						<ScorecardActions />
						<ScorecardHeader />
						<ScorecardLegendsView />
					</div>
					<div className="flex-1 h-100">
						<ScorecardView headerHeight={height} />
					</div>
				</ScorecardContext>
			}
		</div>
	);
}

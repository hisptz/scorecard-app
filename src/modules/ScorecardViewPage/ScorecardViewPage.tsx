import { DimensionFilterArea } from "./components/DimensionFilterArea";
import { useRawDimensions } from "./hooks/dimensions";
import { useMemo, useRef } from "react";
import { isEmpty } from "lodash";
import { useResizeObserver } from "usehooks-ts";
import { DimensionsNotSet } from "./components/DimensionsNotSet";
import { ConfigProvider, useConfigContext } from "./ConfigProvider";
import { ScorecardContext, ScorecardDataProvider, ScorecardHeader, ScorecardLegendsView, ScorecardState, ScorecardStateProvider } from "@hisptz/dhis2-scorecard";
import { ScorecardActions } from "./components/ScorecardActions/ScorecardActions";
import { ScorecardView } from "./components/ScorecardView";
import { getOrgUnitSelectionFromIds } from "../../shared";


function MainView() {
	const { periods, orgUnits } = useRawDimensions();
	const config = useConfigContext();

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

	const dimensionNotSet = isEmpty(periods) || isEmpty(orgUnits);

	return (
		<ScorecardStateProvider initialState={initialState} config={config}>
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
					dimensionNotSet ? <DimensionsNotSet /> : <ScorecardContext config={config}>
						<ScorecardDataProvider>
							<div ref={headerRef} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
								<ScorecardActions />
								<ScorecardHeader />
								<ScorecardLegendsView />
							</div>
							<div className="flex-1 h-100 ">
								<ScorecardView headerHeight={height} />
							</div>
						</ScorecardDataProvider>
					</ScorecardContext>
				}
			</div>
		</ScorecardStateProvider>
	);

}

export function ScorecardViewPage() {

	return (
		<ConfigProvider>
			<MainView />
		</ConfigProvider>
	);
}

import { DimensionFilterArea } from "./components/DimensionFilterArea";
import { useRawDimensions } from "./hooks/dimensions";
import { useMemo, useRef } from "react";
import { isEmpty } from "lodash";
import { DimensionsNotSet } from "./components/DimensionsNotSet";
import { ConfigProvider, useConfigContext } from "./ConfigProvider";
import {
	HighlightedItems,
	ScorecardContext,
	ScorecardDataProvider,
	ScorecardHeader,
	ScorecardLegendsView,
	ScorecardState,
	ScorecardStateProvider
} from "@hisptz/dhis2-scorecard";
import { ScorecardActions } from "./components/ScorecardActions/ScorecardActions";
import { ScorecardView } from "./components/ScorecardView";
import { getOrgUnitSelectionFromIds } from "@/shared";
import { useResizeObserver } from "usehooks-ts";

function MainView() {
	const { periods, orgUnits } = useRawDimensions();
	const config = useConfigContext();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { height } = useResizeObserver({
		ref: containerRef,
		box: "content-box"
	});


	const initialState = useMemo(() => {
		if (!config) {
			return;
		}
		const periodSelection = !isEmpty(periods)
			? {
				periods: periods.map((periodId) => ({ id: periodId }))
			}
			: config?.periodSelection;
		const orgUnitSelection = !isEmpty(orgUnits)
			? getOrgUnitSelectionFromIds(orgUnits)
			: config?.orgUnitSelection;

		return {
			options: config.options,
			orgUnitSelection,
			periodSelection
		} as ScorecardState;
	}, [periods, orgUnits, config]);

	const dimensionNotSet = useMemo(
		() => isEmpty(periods) || isEmpty(orgUnits),
		[periods, orgUnits]
	);

	if (!config.access.read) {
		throw new Error("Access Denied");
	}

	return (
		<ScorecardStateProvider initialState={initialState} config={config}>
			<div
				className="flex flex-col gap-[16px] w-full h-full"
			>
				<DimensionFilterArea />
				{dimensionNotSet ? (
					<DimensionsNotSet />
				) : (
					<ScorecardContext config={config}>
						<ScorecardDataProvider>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 8,
									textAlign: "center"
								}}
							>
								<ScorecardActions />
								<ScorecardHeader />
								<ScorecardLegendsView />
								<div className="px-4">
									<HighlightedItems />
								</div>
							</div>
							<div ref={containerRef} className="flex-1">
								<ScorecardView height={(height ?? 800)} />
							</div>
						</ScorecardDataProvider>
					</ScorecardContext>
				)}
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

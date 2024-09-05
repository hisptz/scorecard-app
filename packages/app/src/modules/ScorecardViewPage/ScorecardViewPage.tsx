import { DimensionFilterArea } from "./components/DimensionFilterArea";
import { useScorecardConfigFromServer } from "./hooks/data";
import { FullPageError, FullPageLoader, getOrgUnitSelectionFromIds } from "@scorecard/shared";
import i18n from "@dhis2/d2-i18n";
import { ScorecardActions } from "./components/ScorecardActions/ScorecardActions";
import { ScorecardView } from "./components/ScorecardView";
import { ScorecardHeader } from "./components/ScorecardHeader";
import { ScorecardLegendsView } from "./components/ScorecardLegendsView";
import { ScorecardContext, ScorecardState } from "@hisptz/dhis2-analytics";
import { useRawDimensions } from "./hooks/dimensions";
import { useMemo } from "react";
import { isEmpty } from "lodash";

export function ScorecardViewPage() {
	const { periods, orgUnits } = useRawDimensions();
	const { config, loading, error, refetch } = useScorecardConfigFromServer();

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
			<FullPageLoader
				text={i18n.t("Getting your scorecard configuration...")}
			/>
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


	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				gap: 16
			}}
		>
			<DimensionFilterArea />
			<ScorecardContext initialState={initialState} config={config}>
				<ScorecardActions />
				<ScorecardHeader />
				<ScorecardLegendsView />
				<div className="flex-1">
					<ScorecardView />
				</div>
			</ScorecardContext>
		</div>
	);
}

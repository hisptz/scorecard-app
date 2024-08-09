import { DimensionFilterArea } from "./components/DimensionFilterArea";
import { useScorecardConfig } from "./hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";
import i18n from "@dhis2/d2-i18n";
import { useEffect } from "react";
import { useDimensions } from "./hooks/dimensions";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { ScorecardActions } from "./components/ScorecardActions/ScorecardActions";
import { ScorecardStateProvider } from "./state/state";
import { ScorecardView } from "./components/ScorecardView";
import { ScorecardConfigProvider } from "./state/config";
import { ScorecardHeader } from "./components/ScorecardHeader";
import { ScorecardLegendsView } from "./ScorecardLegendsView";

export function ScorecardViewPage() {
	const { setDimensions, orgUnit, periods } = useDimensions();
	const { config, loading, error, refetch } = useScorecardConfig();

	useEffect(() => {
		if (config) {
			setDimensions({
				orgUnitSelection: config.orgUnitSelection as OrgUnitSelection,
				periods: config.periodSelection.periods,
			});
		}
	}, [config]);

	if (loading) {
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
				gap: 16,
			}}
		>
			<ScorecardConfigProvider config={config}>
				<ScorecardStateProvider
					initialState={{
						options: config.options,
						periodSelection: {
							...config.periodSelection,
							periods:
								periods?.map((period) => ({ id: period })) ??
								[],
						},
						orgUnitSelection: {
							...orgUnit,
							orgUnits: orgUnit.orgUnits ?? [],
							groups: orgUnit.groups ?? [],
							levels: orgUnit.levels ?? [],
						},
					}}
				>
					<DimensionFilterArea />
					<ScorecardActions />
					<ScorecardHeader />
					<ScorecardLegendsView config={config} />
					<div className="flex-1">
						<ScorecardView config={config} />
					</div>
				</ScorecardStateProvider>
			</ScorecardConfigProvider>
		</div>
	);
}

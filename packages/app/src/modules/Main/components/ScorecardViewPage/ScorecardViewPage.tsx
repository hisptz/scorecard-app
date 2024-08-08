import { DimensionFilterArea } from "./components/DimensionFilterArea";
import { useScorecardConfig } from "./hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";
import i18n from "@dhis2/d2-i18n";
import { useEffect } from "react";
import { useDimensions } from "./hooks/dimensions";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";

export function ScorecardViewPage() {
	const { setDimensions } = useDimensions();
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
			<DimensionFilterArea />
		</div>
	);
}

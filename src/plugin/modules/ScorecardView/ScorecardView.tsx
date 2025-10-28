import { useEffect, useMemo } from "react";
import { usePluginScorecardConfig } from "../../hooks/scorecard";
import {
	HighlightedItems,
	ScorecardContext,
	ScorecardDataProvider,
	ScorecardLegendsView,
	ScorecardState,
	ScorecardStateProvider
} from "@hisptz/dhis2-scorecard";
import { ScorecardTable } from "./ScorecardTable";
import { usePluginConfig } from "../../components/PluginConfigProvider";
import { useManagePluginConfig } from "../../hooks/config";
import { isEmpty, set } from "lodash";
import { getScorecardViewLink } from "@/hooks/navigate";
import { FullPageError, FullPageLoader } from "../../../shared";
import { ScorecardDimensionUpdate } from "@/plugin/modules/ScorecardView/ScorecardDimensionUpdate";

export function ScorecardView() {
	const { loading, config, error, refetch, orgUnits, periods } = usePluginScorecardConfig();
	const {
		props: {
			setDashboardItemDetails,
			dashboardItemId
		}
	} = usePluginConfig();
	const { deleteConfig } = useManagePluginConfig(dashboardItemId);
	const getLink = getScorecardViewLink();
	useEffect(() => {
		if (config) {
			if (setDashboardItemDetails) {
				setDashboardItemDetails({
					itemTitle: config.title,
					appUrl: `#${getLink(config)}`,
					onRemove: () => {
						deleteConfig();
					}
				});
			}
		}
	}, [config]);

	const initialState = useMemo(() => {
		if (config) {
			const baseState = {
				options: {
					...config.options,
					title: false,
					disableFurtherAnalysis: true
				}
			};
			if (!isEmpty(orgUnits)) {
				set(baseState, "orgUnitSelection", {
					orgUnits
				});
			}
			if (!isEmpty(periods)) {
				set(baseState, "periodSelection", {
					periods
				});
			}
			return baseState as ScorecardState;
		}
	}, [orgUnits, periods, config]);

	if (loading) {
		return <FullPageLoader small />;
	}

	if (error) {
		return <FullPageError error={error} resetErrorBoundary={refetch} />;
	}

	if (!config) {
		return (
			<FullPageError
				error={Error("Missing valid configuration")}
				resetErrorBoundary={refetch}
			/>
		);
	}

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<ScorecardStateProvider
				initialState={initialState}
				config={config!}
			>
				<ScorecardDimensionUpdate scorecardConfig={config} />
				<ScorecardContext config={config!}>
					<ScorecardDataProvider>
						<ScorecardLegendsView />
						<div className="px-4">
							<HighlightedItems />
						</div>
						<ScorecardTable />
					</ScorecardDataProvider>
				</ScorecardContext>
			</ScorecardStateProvider>
		</div>
	);
}

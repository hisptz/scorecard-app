import { ScorecardPluginConfig } from "../hooks/config";

export type PluginProps = {
	config: {
		apiVersion: number;
		appName: string;
		appVersion: string;
		direction: any;
		loginApp: boolean;
		plugin: boolean;
		pwaEnabled: boolean;
		url: string;
	}
	dashboardItemFilters: {
		pe: {
			name: string;
			id: string;
		}[],
		ou: {
			id: string;
			name: string;
		}[]
	};
	dashboardItemId: string;
	dashboardMode: "edit" | "view",
	setDashboardItemDetails: (dashboardItemDetails: {
		itemTitle: string;
		appUrl: string;
		onRemove: () => void;
	}) => void;
}


export type PluginConfig = {
	props: PluginProps,
	config?: ScorecardPluginConfig,
}

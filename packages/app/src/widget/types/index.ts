export type PluginProps = {
	config: {
		apiVersion: number;
		appName: string;
		appVersion: string;
		direction: any;
		loginApp: boolean;
		plugin: boolean;
		pwaEnabled: boolean;
		requiredProps: any[],
		url: string;
	}
	resizePluginWidth: any
}


export type PluginConfig = {
	props: PluginProps,
	dashboardItemId: string;
	scorecardId?: string;
}

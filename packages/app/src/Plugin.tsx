import React, { Suspense } from "react";
import "./locales";
import "./Plugin.css";
import { FullPageLoader, useInitApp } from "@scorecard/shared";
import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { DATASTORE_WIDGET_NAMESPACE } from "./plugin/constants/scorecard";
import { RecoilRoot } from "recoil";
import { WidgetRouter } from "./widget/modules/Router";
import { CssReset } from "@dhis2/ui";


type PluginProps = {
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

const Plugin = (props: PluginProps) => {
	const { initializeState } = useInitApp();

	console.log({ props });

	return (
		<div className="plugin-container">
			<CssReset />
			<DataStoreProvider namespace={DATASTORE_WIDGET_NAMESPACE} loadingComponent={<FullPageLoader />}>
				<RecoilRoot initializeState={initializeState}>
					<Suspense fallback={<FullPageLoader />}>
						<WidgetRouter />
					</Suspense>
				</RecoilRoot>
			</DataStoreProvider>
		</div>
	);
};

export default Plugin;

import React, { FC, Suspense } from "react";
import "./locales";
import "./Plugin.css";
import { FullPageLoader, useInitApp } from "./shared";
import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { RecoilRoot } from "recoil";
import { WidgetRouter } from "./plugin/modules/Router";
import { CssReset } from "@dhis2/ui";
import { DATASTORE_WIDGET_NAMESPACE } from "./plugin/constants/scorecard";
import { PluginProps } from "./plugin/types";

const DashboardPlugin: FC<PluginProps> = (props: PluginProps) => {
	const { initializeState } = useInitApp();

	return (
		<div className="plugin-container">
			<CssReset />
			<DataStoreProvider
				namespace={DATASTORE_WIDGET_NAMESPACE}
				loadingComponent={<FullPageLoader />}
			>
				<RecoilRoot initializeState={initializeState}>
					<Suspense fallback={<FullPageLoader small />}>
						<WidgetRouter props={props} />
					</Suspense>
				</RecoilRoot>
			</DataStoreProvider>
		</div>
	);
};

export default DashboardPlugin;

import React, { Suspense } from "react";
import "./locales";
import "./Plugin.css";
import { FullPageLoader, useInitApp } from "@scorecard/shared";
import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { DATASTORE_WIDGET_NAMESPACE } from "./plugin/constants/scorecard";
import { RecoilRoot } from "recoil";
import { WidgetRouter } from "./widget/modules/Router";
import { CssReset } from "@dhis2/ui";
import { PluginConfigProvider } from "./widget/components/PluginConfigProvider";
import { PluginProps } from "./widget/types";


const Plugin = (props: PluginProps) => {
	const { initializeState } = useInitApp();

	console.log({ props });

	return (
		<div className="plugin-container">
			<CssReset />
			<DataStoreProvider namespace={DATASTORE_WIDGET_NAMESPACE} loadingComponent={<FullPageLoader />}>
				<RecoilRoot initializeState={initializeState}>
					<Suspense fallback={<FullPageLoader />}>
						<PluginConfigProvider props={props}>
							<WidgetRouter />
						</PluginConfigProvider>
					</Suspense>
				</RecoilRoot>
			</DataStoreProvider>
		</div>
	);
};

export default Plugin;

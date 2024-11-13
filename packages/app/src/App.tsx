import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { CssReset } from "@dhis2/ui";
import { DATASTORE_NAMESPACE, FullPageError, FullPageLoader, useInitApp } from "@scorecard/shared";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import "./media-queries.css";
import "./App.css";
import "./print.css";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";
import { DialogProvider } from "@hisptz/dhis2-ui";
import Router from "./modules/Router";

const MyApp = () => {
	const { initializeState } = useInitApp();

	return (
		<DataStoreProvider
			namespace={DATASTORE_NAMESPACE}
			defaultUserSettings={{
				scorecardDisplayType: "grid"
			}}
			loadingComponent={<FullPageLoader />}
		>
			<CssReset />
			<RecoilRoot initializeState={initializeState}>
				<ErrorBoundary FallbackComponent={FullPageError}>
					<DialogProvider>
						<Suspense fallback={<FullPageLoader />}>
							<div className="main-container">
								<Router />
							</div>
						</Suspense>
					</DialogProvider>
				</ErrorBoundary>
			</RecoilRoot>
		</DataStoreProvider>
	);
};

export default MyApp;

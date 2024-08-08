import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { CssReset } from "@dhis2/ui";
import {
	DATASTORE_NAMESPACE,
	FullPageError,
	FullPageLoader,
	useInitApp,
} from "@scorecard/shared";
import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import postRobot from "@krakenjs/post-robot";
import "./media-queries.css";
import "./App.css";
import "./print.css";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";
import { isEmpty } from "lodash";
import { DialogProvider } from "@hisptz/dhis2-ui";
import Router from "./modules/Router";

const MyApp = () => {
	const { initializeState } = useInitApp();
	const iframeRef: any = useRef(null);

	const dashboardItemId: String | undefined = (
		/[?&]dashboardItemId=([a-zA-Z0-9]{11})(?:&|$)/g.exec(
			window.location.search,
		) || [undefined]
	).pop();

	const sendDataToPlugin = (id: String) => {
		const data = { dashboardItemId: id };
		if (iframeRef.current && iframeRef.current.contentWindow) {
			postRobot
				.send(iframeRef.current.contentWindow, "dataFromParent", data)
				.catch((error: any) => {
					console.error("Error sending data:", error);
				});
		}
	};

	const hideHeader = () => {
		const header = document.querySelector(
			"#dhis2-app-root > div > div:nth-child(1)",
		);
		if (header) {
			header.remove();
		}
	};
	useLayoutEffect(() => {
		if (dashboardItemId) {
			hideHeader();
		}
	}, []);

	useEffect(() => {
		if (dashboardItemId) {
			sendDataToPlugin(dashboardItemId);
		}
	}, [dashboardItemId]);

	return isEmpty(dashboardItemId) ? (
		<DataStoreProvider
			namespace={DATASTORE_NAMESPACE}
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
	) : (
		<iframe
			ref={iframeRef}
			src="./plugin.html"
			style={{ width: "100%", height: "99%", border: "none" }}
			title="Interactive Scorecard Widget"
			loading="lazy"
		/>
	);
};

export default MyApp;

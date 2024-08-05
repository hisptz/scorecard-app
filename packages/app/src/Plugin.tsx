import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { CssReset } from "@dhis2/ui";
import { ConfirmDialogProvider } from "@hisptz/dhis2-ui";
import { FullPageError, FullPageLoader, useInitApp } from "@scorecard/shared";
import React, {
	ReactNode,
	Suspense,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import postRobot from "@krakenjs/post-robot";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";
import "./media-queries.css";
import "./App.css";
import { DATASTORE_WIDGET_NAMESPACE } from "./plugin/constants/scorecard";
import Router from "./plugin/modules/Router";

const Plugin = () => {
	const [propsFromParent, setPropsFromParent] = useState<any>();
	const { initializeState } = useInitApp();

	const receivePropsFromParent = (event: any) => setPropsFromParent(event.data);

	useEffect(() => {
		const dataListener = postRobot.on(
			"dataFromParent",
			{ window: window.parent },
			receivePropsFromParent,
		);

		return () => {
			dataListener.cancel();
		};
	}, []);

	return propsFromParent ? (
		<DataStoreProvider
			namespace={DATASTORE_WIDGET_NAMESPACE}
			loadingComponent={<FullPageLoader />}
		>
			<CssReset />
			<RecoilRoot initializeState={initializeState}>
				<ErrorBoundary FallbackComponent={FullPageError}>
					<ConfirmDialogProvider>
						<Suspense fallback={<FullPageLoader />}>
							<div className="main-container">
								<Router dashboardId={propsFromParent.dashboardItemId} />
							</div>
						</Suspense>
					</ConfirmDialogProvider>
				</ErrorBoundary>
			</RecoilRoot>
		</DataStoreProvider>
	) : null;
};

export default Plugin;

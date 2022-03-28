import {DataStoreProvider} from "@dhis2/app-service-datastore";
import {CssReset} from "@dhis2/ui";
import {ConfirmDialogProvider} from "@hisptz/react-ui";
import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {RecoilRoot} from "recoil";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";
import "./media-queries.css";
import "./App.css";
import Router from "./modules/Router";
import {useInitApp} from "@hisptz/scorecard-hooks";
import {FullPageError, FullPageLoader} from "@hisptz/scorecard-components";
import {DATASTORE_WIDGET_NAMESPACE} from "./constants/scorecard";


export const App = () => {
    const {initializeState} = useInitApp();

    return <DataStoreProvider
        namespace={DATASTORE_WIDGET_NAMESPACE}
        loadingComponent={<FullPageLoader/>}>
        <CssReset/>
        <RecoilRoot initializeState={initializeState}>
            <ErrorBoundary FallbackComponent={FullPageError}>
                <ConfirmDialogProvider>
                    <Suspense fallback={<FullPageLoader/>}>
                        <div className="main-container">
                            <Router/>
                        </div>
                    </Suspense>
                </ConfirmDialogProvider>
            </ErrorBoundary>
        </RecoilRoot>
    </DataStoreProvider>

}
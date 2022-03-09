import {DataStoreProvider} from "@dhis2/app-service-datastore";
import {CssReset} from "@dhis2/ui";
import {ConfirmDialogProvider} from "@hisptz/react-ui";
import useInitApp from "@hisptz/scorecard-hooks/src/useInitApp";
import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {RecoilRoot} from "recoil";
import "./media-queries.css";
import "./App.css";
import "./print.css"
import FullPageError from "../../../shared/components/src/Errors/FullPageError";
import {FullPageLoader} from "../../../shared/components/src/Loaders";
import {DATASTORE_NAMESPACE} from "../../../shared/constants/src/config";
import Router from "./modules/Router";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";

const MyApp = () => {
    const {initializeState} = useInitApp();

    return (
        <DataStoreProvider
            namespace={DATASTORE_NAMESPACE}
            loadingComponent={<FullPageLoader/>}
        >
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
    );
};

export default MyApp;

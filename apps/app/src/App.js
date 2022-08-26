import {DataStoreProvider} from "@dhis2/app-service-datastore";
import {CssReset} from "@dhis2/ui";
import {ConfirmDialogProvider} from "@hisptz/react-ui";
import {FullPageError, FullPageLoader} from "@hisptz/scorecard-components";
import {DATASTORE_NAMESPACE} from "@hisptz/scorecard-constants";
import {useInitApp} from "@hisptz/scorecard-hooks";
import React, {Suspense, useEffect} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {RecoilRoot, useRecoilSnapshot} from "recoil";
import "./media-queries.css";
import "./App.css";
import "./print.css"
import Router from "./modules/Router";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";

function DebugObserver(){
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        console.debug('The following atoms were modified:');
        for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
            console.debug(node.key, snapshot.getLoadable(node));
        }
    }, [snapshot]);

    return null;
}

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

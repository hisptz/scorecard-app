import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {RecoilRoot} from "recoil";
import './media-queries.css'
import "./App.css";
import useInitApp from "./core/hooks/useInitApp";
import {EngineState} from "./core/state/engine";
import {ScreenDimensionState} from "./core/state/window";
import Router from "./modules/Router";
import FullPageError from "./shared/Components/Errors/FullPageError";
import {FullPageLoader} from "./shared/Components/Loaders";
import "./locales";
import {getWindowDimensions} from "./shared/utils/utils";


const MyApp = () => {
    const {engine} = useInitApp()

    function initializeState({set}) {
        set(ScreenDimensionState, getWindowDimensions())
        set(EngineState, engine)
    }

    return (
        <DataStoreProvider
            namespace={"hisptz-scorecard"}
            loadingComponent={<FullPageLoader/>}
        >
            <RecoilRoot initializeState={initializeState}>
                <ErrorBoundary FallbackComponent={FullPageError}>
                    <Suspense fallback={<FullPageLoader/>}>
                        <div className="main-container">
                            <Router/>
                        </div>
                    </Suspense>
                </ErrorBoundary>
            </RecoilRoot>
        </DataStoreProvider>
    );
};

export default MyApp;

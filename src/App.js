import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useWebVitals} from "react-web-vitals";
import {RecoilRoot} from "recoil";
import './media-queries.css'
import "./App.css";
import Router from "./modules/Router";
import FullPageError from "./shared/Components/Errors/FullPageError";
import {FullPageLoader} from "./shared/Components/Loaders";
import "./locales";
import {Fn} from "@iapps/function-analytics";
import {useConfig} from "@dhis2/app-runtime";

const MyApp = () => {
    useWebVitals()
    const {baseUrl, apiVersion} = useConfig()
    Fn.init({
        baseUrl: `${baseUrl}/api/${apiVersion}/`,
    });

    return (
        <DataStoreProvider
            namespace={"hisptz-scorecard"}
            loadingComponent={<FullPageLoader/>}
        >
            <RecoilRoot>
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

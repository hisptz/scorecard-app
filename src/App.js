import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {RecoilRoot} from "recoil";
import "./App.css";
import Router from "./modules/Router";
import {FullPageLoader} from "./shared/Components/Loaders";
import "./locales";
import FullPageError from "./shared/Components/Errors/FullPageError";
import {Fn} from "@iapps/function-analytics";
import {useConfig} from "@dhis2/app-runtime";

const MyApp = () => {
    const {baseUrl, apiVersion} = useConfig()
    Fn.init({
        baseUrl: `${baseUrl}/api/${apiVersion}/`,
        username: 'admin',
        password: 'district'
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

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

const MyApp = () => {
    const url = process.env.REACT_APP_DHIS2_BASE_URL || "";
    Fn.init({baseUrl: url + "/api/"});
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

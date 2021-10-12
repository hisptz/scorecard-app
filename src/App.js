import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { CssReset } from "@dhis2/ui";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import "./media-queries.css";
import "./App.css";
import { DATASTORE_NAMESPACE } from "./core/constants/config";
import useInitApp from "./core/hooks/useInitApp";
import Router from "./modules/Router";
import FullPageError from "./shared/Components/Errors/FullPageError";
import { FullPageLoader } from "./shared/Components/Loaders";
import "./locales";
import "intro.js/introjs.css";
import "./intro-dhis2.css";

const MyApp = () => {
  const { initializeState } = useInitApp();

  return (
    <DataStoreProvider
      namespace={DATASTORE_NAMESPACE}
      loadingComponent={<FullPageLoader />}
    >
      <CssReset />
      <RecoilRoot initializeState={initializeState}>
        <ErrorBoundary FallbackComponent={FullPageError}>
          <Suspense fallback={<FullPageLoader />}>
            <div className="main-container">
              <Router />
            </div>
          </Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </DataStoreProvider>
  );
};

export default MyApp;

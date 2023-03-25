import {FullPageError, FullPageLoader} from "@scorecard/shared";
import {SystemSettingsState} from "@scorecard/shared";
import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {useRecoilValue} from "recoil";

const Main = React.lazy(() => import("../Main"));
const ScorecardManagement = React.lazy(() =>
    import("../Main/Components/ScoreCardManagement")
);
const ScorecardView = React.lazy(() =>
    import("@scorecard/shared").then(module => ({default: module.ScorecardView}))
);

const ScorecardMigration = React.lazy(() =>
    import("../Main/Components/ScorecardMigration")
);

const pages = [
    {
        pathname: "/migrate",
        component: ScorecardMigration,
    },
    {
        pathname: "/edit/:id",
        component: ScorecardManagement,
    },
    {
        pathname: "/add",
        component: ScorecardManagement,
    },
    {
        pathname: "/view/:id",
        component: ScorecardView,
    },
    {
        pathname: "/",
        component: Main,
    },
];

export default function Router() {
    useRecoilValue(SystemSettingsState);
    return (
        <HashRouter>
            <ErrorBoundary FallbackComponent={FullPageError}>
                <Suspense fallback={<FullPageLoader/>}>
                    <Switch>
                        {pages.map(({pathname, component}) => {
                            const Component = component;
                            return (
                                <Route key={pathname} path={pathname}>
                                    <ErrorBoundary FallbackComponent={FullPageError}>
                                        <Component/>
                                    </ErrorBoundary>
                                </Route>
                            );
                        })}
                        <Route path="/*">
                            <Redirect to={"/"}/>
                        </Route>
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </HashRouter>
    );
}

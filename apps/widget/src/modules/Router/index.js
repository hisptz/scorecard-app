import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {useRecoilValue} from "recoil";
import Main from "../Main/index";
import {SystemSettingsState} from "@hisptz/scorecard-state";
import {FullPageError, FullPageLoader} from "@hisptz/scorecard-components";

const ScorecardView = React.lazy(() =>
    import("@hisptz/scorecard-components").then(module => ({default: module.ScorecardView}))
);

const pages = [
    {
        pathname: "/view/:id",
        component: ScorecardView,
    },
    {
        pathname: "/",
        component: Main
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
                                        <Component widget={true}/>
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

import React, {Suspense} from "react";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import {useRecoilValue} from "recoil";
import {SystemSettingsState} from "../../core/state/system";
import {FullPageLoader} from "../../shared/Components/Loaders";

const Main = React.lazy(() => import("../Main"))
const ScorecardManagement = React.lazy(() => import("../Main/Components/ScoreCardManagement"))
const ScorecardView = React.lazy(() => import("../Main/Components/ScorecardView"))


const pages = [
    {
        pathname: '/edit/:id',
        component: ScorecardManagement
    },
    {
        pathname: '/add',
        component: ScorecardManagement
    },
    {
        pathname: '/view/:id',
        component: ScorecardView
    },
    {
        pathname: '/',
        component: Main
    }
]

export default function Router() {
    useRecoilValue(SystemSettingsState)
    return (
        <HashRouter basename='/'>
            <Suspense fallback={<FullPageLoader/>}>
                <Switch>
                    {
                        pages.map(({pathname, component}) => {
                            return <Route key={pathname} path={pathname} component={component}/>
                        })
                    }
                    <Route path='/*'>
                        <Redirect to={'/'}/>
                    </Route>
                </Switch>
            </Suspense>
        </HashRouter>
    )
}

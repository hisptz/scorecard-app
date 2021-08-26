import React, {Suspense} from "react";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import {useRecoilValue} from "recoil";
import {SystemSettingsState} from "../../core/state/system";
import {FullPageLoader} from "../../shared/Components/Loaders";
import Main from "../Main";
import ScoreCardManagement from "../Main/Components/ScoreCardManagement";
import ScorecardView from "../Main/Components/ScorecardView";
import ExampleForms from "../test/Forms";

const pages = [
    {
        pathname: '/test',
        component: ExampleForms
    },
    {
        pathname: '/edit/:id',
        component: ScoreCardManagement
    },
    {
        pathname: '/add',
        component: ScoreCardManagement
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
            <Switch>
                {
                    pages.map(({pathname, component}) => {
                        const Component = component;
                        return <Route key={pathname} path={pathname}>
                            <Suspense fallback={<FullPageLoader/>}>
                                <Component/>
                            </Suspense>
                        </Route>
                    })
                }
                <Route path='/*'>
                    <Redirect to={'/'}/>
                </Route>
            </Switch>
        </HashRouter>
    )
}

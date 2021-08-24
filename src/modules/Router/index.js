import React, {Suspense} from "react";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import {useRecoilValue} from "recoil";
import useSetDataEngine from "../../core/hooks/useSetDataEngine";
import {ScreenDimensionState} from "../../core/state/window";
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
    useSetDataEngine();
    useRecoilValue(ScreenDimensionState)
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

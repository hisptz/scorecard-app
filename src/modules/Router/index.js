import React from "react";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import useSetDataEngine from "../../core/hooks/useSetDataEngine";
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
    return (
        <HashRouter basename='/'>
            <Switch>
                {
                    pages.map(({pathname, component}) => (
                        <Route key={pathname} path={pathname} component={component}/>))
                }
                <Route path='/*'>
                    <Redirect to={'/'}/>
                </Route>
            </Switch>
        </HashRouter>
    )
}

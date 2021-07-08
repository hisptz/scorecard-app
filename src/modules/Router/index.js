import React from "react";
import {MemoryRouter, Route, Switch} from 'react-router-dom'
import Admin from "../Admin";
import Main from "../Main";
import ScorecardView from "../Main/Components/ScorecardView";
import ExampleForms from "../test/Forms";

export default function Router() {

    const pages = [
        {
            pathname: '/home',
            component: Main
        },
        {
            pathname: '/test',
            component: ExampleForms
        },
        {
            pathname: '/admin',
            component: Admin
        },
        {
            pathname: '/view',
            component: ScorecardView
        }
    ]

    return (
        <MemoryRouter initialIndex={0} initialEntries={pages}>
            <Switch>
                {
                    pages.map(({pathname, component}) => (
                        <Route key={pathname} path={pathname} component={component}/>))
                }
            </Switch>
        </MemoryRouter>
    )
}

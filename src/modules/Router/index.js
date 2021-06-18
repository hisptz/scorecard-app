import React from "react";
import {MemoryRouter, Route, Switch} from 'react-router-dom'
import Admin from "../Admin";
import EmptyScoreCardList from "../Main";
import ExampleForms from "../test/Forms";

export default function Router() {

    const pages = [
        {
            pathname: '/home',
            component: EmptyScoreCardList
        },
        {
            pathname: '/test',
            component: ExampleForms
        },
        {
            pathname: '/admin',
            component: Admin
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

import React from "react";
import {MemoryRouter, Route, Switch} from 'react-router-dom'
import Test from "../test";
import ExampleForms from "../test/Forms";

export default function Router() {

    const pages = [
        {
            pathname: '/home',
            component: Test
        },
        {
            pathname: '/test',
            component: ExampleForms
        },
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

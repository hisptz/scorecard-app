import React from 'react'
import {MemoryRouter, Route, Switch} from "react-router-dom";
import ScoreCardManagement from "./Components/ScoreCardManagement";

export default function Admin() {

    const routes = [
        {
            pathname: '/scorecard-new',
            component: ScoreCardManagement
        },
    ]

    return (
        <div>
            <MemoryRouter initialEntries={routes} initialIndex={0} >
                <Switch>
                    {
                        routes.map(({pathname, component}) => (
                            <Route component={component} key={pathname} path={pathname}/>))
                    }
                </Switch>
            </MemoryRouter>
        </div>
    )
}

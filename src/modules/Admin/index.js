import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ScoreCardManagement from "../Main/Components/ScoreCardManagement";

export default function Admin() {
  const { url } = useRouteMatch();
  const routes = [
    {
      pathname: "/",
      component: ScoreCardManagement,
    },
  ];

  return (
    <div className="pb-32">
      <Switch>
        {routes.map(({ pathname, component }) => (
          <Route
            component={component}
            key={pathname}
            path={`${url}${pathname}`}
          />
        ))}
      </Switch>
    </div>
  );
}

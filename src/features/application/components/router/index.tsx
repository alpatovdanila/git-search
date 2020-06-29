import React from "react";

import { Route, RouteProps, Switch } from "wouter";

type Props = {
  routes: RouteProps[];
};

export const Router = React.memo(({ routes }: Props) => (
  <>
    <Switch>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} component={route.component}>
          {route.children && route.children}
        </Route>
      ))}
    </Switch>
  </>
));

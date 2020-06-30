import React from "react";

import { Route, RouteProps, Switch } from "wouter";

type Props = {
  routes: RouteProps[];
};

const RouterComponent = ({ routes }: Props) => (
  <>
    <Switch>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} component={route.component}>
          {route.children && route.children}
        </Route>
      ))}
    </Switch>
  </>
);

export const Router = RouterComponent; //React.memo(RouterComponent);

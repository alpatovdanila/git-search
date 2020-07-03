import React from "react";
import appConfig from "@/config";

import { Route, Router as Wouter, RouteProps, Switch } from "wouter";

type Props = {
  routes: RouteProps[];
};

const RouterComponent = ({ routes }: Props) => {
  return (
    <Wouter base={appConfig.appBase}>
      <Switch>
        {routes.map((route, key) => (
          <Route key={key} path={route.path} component={route.component}>
            {route.children && route.children}
          </Route>
        ))}
      </Switch>
    </Wouter>
  );
};
export const Router = RouterComponent;

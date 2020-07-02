import React, { useEffect } from "react";
import { applicationStarted } from "@/features/application/model/application";
import { Router } from "@/features/application/components/router";
import { Search } from "@/pages/search";
import { Index } from "@/pages/index";
import { RouteProps, Redirect } from "wouter";
import { useStore } from "effector-react";
import { $transport } from "@/features/application/model/transport";
import { Animation, HalfCircle } from "@/ui";

const appRoutes: RouteProps[] = [
  {
    component: Index,
    path: "/",
  },
  {
    component: Search,
    path: "/search/",
  },
  {
    path: "/:all*",
    children: [<Redirect to={"/"} />],
  },
];

export const App = () => {
  const transport = useStore($transport);

  useEffect(() => applicationStarted(), []);

  return (
    <>
      {transport.fetching && (
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <Animation type={"rotate"} infinite>
            <HalfCircle />
          </Animation>
        </div>
      )}
      <Router routes={appRoutes} />
    </>
  );
};

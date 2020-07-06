import { Redirect, RouteProps } from "wouter";
import { Index } from "@/pages/index";
import { Search } from "@/pages/search";
import React from "react";

export const appRoutes: RouteProps[] = [
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

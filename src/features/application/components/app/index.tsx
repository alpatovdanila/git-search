import React, {useEffect} from "react";
import {applicationStarted} from "@/features/application/model/application";
import {Router} from "@/features/application/components/router";
import {Search} from "@/pages/search";
import {Index} from "@/pages/index";
import {RouteProps, Redirect} from "wouter";


const appRoutes: RouteProps[] = [
    {
        component: Index,
        path: '/'
    },
    {
        component: Search,
        path: '/search/'
    },
    {
        path: '/:all*',
        children: [<Redirect to={"/"}/>]
    }
]


export const App = () => {
    useEffect(() => applicationStarted(), []);
    return <Router routes={appRoutes}/>
}

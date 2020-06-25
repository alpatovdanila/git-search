import React, {useEffect} from "react";
import {applicationStarted} from "@/features/application/model/application";
import {useStore} from "effector-react";
import {$searchParameters, searchParametersUpdated} from "@/features/search/model/searchParameters";
import {SearchForm} from "@/features/search/components/search-form";

export const App = ()=> {
    const store = useStore($searchParameters);
    useEffect(() => applicationStarted(), []);
    return <>
        <SearchForm/>
    </>
}

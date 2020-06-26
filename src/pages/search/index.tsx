import React from "react";
import {SearchForm} from "@/features/search/components/search-form";
import {useStore} from "effector-react";
import {$searchResult} from "@/features/search/model/searchResults";

export const Search = () => {
    const search = useStore($searchResult);
    return <>

        <SearchForm autoSubmitTimeout={500}/>

        <h1>Search results</h1>
        {JSON.stringify(search)}
    </>
}
import {createEffect, createStore, guard} from "effector";
import {getSearchRepositories} from "@/api/repositories";
import {SearchParameters, $searchParameters} from "@/features/search/model/searchParameters";

export type Repository = {
    name: string;
    description?: string;
    forks: number;
    stars: number;
    license?: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    },
    language: string;
    url: string;
    id: number;
};

export type Search = {
    totalCount: number,
    items: Repository[],
    incomplete_results:boolean,
}

export const $searchResult = createStore<Search>({
    totalCount: 0,
    items: [],
    incomplete_results:false,
});

export const invalidateResults = createEffect({
    handler:async (params:SearchParameters) => getSearchRepositories(params)
});

$searchResult.on(invalidateResults.done, (state, {result}) => result);



guard({
    source:$searchParameters,
    target:invalidateResults,
    filter: value => !!value.query
});


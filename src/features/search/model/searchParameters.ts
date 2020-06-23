import {createStore, createEvent} from "effector";
import {Language} from "@/features/search/model/languages";

export type SearchParameters = {
    query: string,
    language: Language | null,
    order: string | null,
    page: number,
    sort: string | null,
    perPage: number,
}

export const $searchParameters = createStore<SearchParameters>({
    query: '',
    language: null,
    order: null,
    sort: null,
    page: 1,
    perPage: 25,
});

export const searchParametersUpdated = createEvent<Partial<SearchParameters>>();

$searchParameters.on(searchParametersUpdated, (state, parameters) => ({...state, ...parameters}));
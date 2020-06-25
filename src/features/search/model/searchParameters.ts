import {createStore, createEvent, createEffect, forward} from "effector";
import {createLocationSearch} from "@/lib/locationSearch";

export type Order = 'desc' | 'asc';

export type Sort = 'stars' | 'forks' | 'updated' | 'best-match' | 'help-wanted-issues'

export type SearchParameters = {
    query: string,
    language: string | null,
    order: Order | null,
    sort: Sort | null,
    page: number,
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

const propagateToURLFx = createEffect({
    handler: (parameters: SearchParameters) => {
        window.history.pushState({}, '', createLocationSearch(parameters))
    }
});

forward({from: $searchParameters, to: propagateToURLFx});

$searchParameters.on(searchParametersUpdated, (state, parameters) => ({...state, ...parameters}));
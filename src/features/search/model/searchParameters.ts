import {createStore, createEvent, createEffect, forward, sample} from "effector";
import {createLocationSearch, getLocationSearchParams} from "@/lib/locationSearch";
import {pick} from "@/lib/pick";

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

// Retrieve initial state from search URL
const initialState = pick(getLocationSearchParams(window.location.search), {
    query: '',
    language: null,
    order: null,
    sort: null,
    page: 1,
    perPage: 25
});

export const $searchParameters = createStore<SearchParameters>(initialState);

export const searchParametersUpdated = createEvent<Partial<SearchParameters>>();

$searchParameters.on(searchParametersUpdated, (state, parameters) => ({...state, ...parameters}));

const propagateToURLFx = createEffect({
    handler: (parameters: SearchParameters) => {
        window.history.pushState({}, '', '/search/?' + createLocationSearch(parameters))
    }
});

forward({from: $searchParameters, to: propagateToURLFx});


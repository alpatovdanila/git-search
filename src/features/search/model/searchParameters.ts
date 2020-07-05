import {
  createStore,
  createEvent,
  createEffect,
  guard,
  sample,
} from "effector";
import {
  createLocationSearch,
  getLocationSearchParams,
} from "@/lib/locationSearch";

import appConfig from "@/config";
import { searchPageGate } from "@/pages/search/searchPageGate";
import {SearchOrder, SearchParameters, SearchSort} from "@/api/repositories";



export const $searchParameters = createStore<SearchParameters>({
  query: "",
  language: null,
  order: 'desc',
  sort: 'best-match',
  page: 1,
  perPage: 25,
});

export const searchParametersUpdated = createEvent<Partial<SearchParameters>>();

export const refillFromUrlFx = createEffect({
  handler: async () => {
    const params = getLocationSearchParams(window.location.search);
    return {
      query: params.query || "",
      language: params.language || null,
      order: (params.order as SearchOrder) || 'desc',
      sort: (params.sort as SearchSort) || 'best-match',
      page: params.page ? +params.page : 1,
    };
  },
});

export const propagateToUrlFx = createEffect({
  handler: (parameters: SearchParameters) => {
    window.history.pushState(
      {},
      "",
      `${appConfig.appBase}/search/?` + createLocationSearch(parameters)
    );
  },
});

$searchParameters
  .on(
    [searchParametersUpdated, refillFromUrlFx.doneData],
    (state, parameters) => {
      return {
        ...state,
        ...parameters,
      };
    }
  )
  .reset(searchPageGate.close);

// Propagate changes in parameters to URL
guard({
  source: sample({
    source: $searchParameters,
    clock: searchParametersUpdated,
  }),
  filter: searchPageGate.status,
  target: propagateToUrlFx,
});

// Refill from url when history changed
const urlChanged = createEvent();
window.addEventListener("popstate", () => setTimeout(() => urlChanged()));
guard({
  source: urlChanged,
  filter: searchPageGate.status,
  target: refillFromUrlFx,
});

// Refill parameters from url when page mounted
guard({
  source: searchPageGate.status,
  filter: searchPageGate.status,
  target: refillFromUrlFx,
});

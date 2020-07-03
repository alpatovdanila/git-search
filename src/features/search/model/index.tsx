import {
  combine,
  createStore,
  createEvent,
  createEffect,
  guard,
  sample,
  forward,
} from "effector";

import appConfig from "@/config";

import {
  $searchParameters,
  refillFromUrlFx,
  SearchParameters,
  searchParametersUpdated,
} from "@/features/search/model/searchParameters";

import {
  $searchResults,
  invalidateResultsFx,
} from "@/features/search/model/searchResults";

import { createLocationSearch } from "@/lib/locationSearch";

export const $pageMounted = createStore(false);
export const pageMounted = createEvent();
export const pageUnmounted = createEvent();
$pageMounted.on(pageMounted, () => true);

// Propagate changes in parameters to URL
guard({
  source: sample({
    source: $searchParameters,
    clock: searchParametersUpdated,
  }),
  filter: $pageMounted,
  target: createEffect({
    handler: (parameters: SearchParameters) => {
      window.history.pushState(
        {},
        "",
        `${appConfig.appBase}/search/?` + createLocationSearch(parameters)
      );
    },
  }),
});

forward({
  from: pageMounted,
  to: refillFromUrlFx,
});

// When parameters changing, invalidate search results
guard({
  source: $searchParameters,
  filter: $pageMounted,
  target: invalidateResultsFx,
});

export const $search = combine({
  parameters: $searchParameters,
  results: $searchResults,
  pageMounted: $pageMounted,
}).reset(pageUnmounted);

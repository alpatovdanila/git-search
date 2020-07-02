import {
  combine,
  createStore,
  createEvent,
  forward,
  createEffect,
  guard,
} from "effector-logger";
import {
  $searchParameters,
  refillFromURL,
  SearchParameters,
} from "@/features/search/model/searchParameters";
import {
  $searchResults,
  invalidateResultsFx,
} from "@/features/search/model/searchResults";
import { createLocationSearch } from "@/lib/locationSearch";

const $pageMounted = createStore(false);
export const pageMounted = createEvent();
export const pageUnmounted = createEvent();
$pageMounted.on(pageMounted, () => true);

//Propagate parameters changes to URL
forward({
  from: $searchParameters,
  to: createEffect({
    handler: (parameters: SearchParameters) => {
      window.history.pushState(
        {},
        "",
        "/search/?" + createLocationSearch(parameters)
      );
    },
  }),
});


forward({
  from: pageMounted,
  to: refillFromURL,
});

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



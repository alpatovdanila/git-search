import {
  combine,
  createStore,
  createEvent,
  forward,
  createEffect,
  guard,
} from "effector";
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

//Fill parameters from url on page mount
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
});

$search.watch(console.log);

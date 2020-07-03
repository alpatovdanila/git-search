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

export type Order = "desc" | "asc";

export type Sort =
  | "stars"
  | "forks"
  | "updated"
  | "best-match"
  | "help-wanted-issues";

export type SearchParameters = {
  query: string;
  language: string | null;
  order: Order | null;
  sort: Sort | null;
  page: number;
  perPage: number;
};

export const $searchParameters = createStore<SearchParameters>({
  query: "",
  language: null,
  order: null,
  sort: null,
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
      order: (params.order as Order) || null,
      sort: (params.sort as Sort) || null,
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

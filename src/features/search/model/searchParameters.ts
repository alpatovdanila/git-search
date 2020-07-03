import { createStore, createEvent, createEffect, forward } from "effector";
import { getLocationSearchParams } from "@/lib/locationSearch";
import { pageMounted } from "@/features/search/model/index";

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
  page: 0,
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
      page: params.page ? +params.page : 0,
    };
  },
});

window.addEventListener("popstate", () => refillFromUrlFx());

$searchParameters.on(
  [searchParametersUpdated, refillFromUrlFx.doneData],
  (state, parameters) => {
    return {
      ...state,
      ...parameters,
    };
  }
);

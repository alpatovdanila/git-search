import { createEffect, createStore, guard } from "effector";
import { getSearchRepositories } from "@/api/repositories";
import {
  $searchParameters,
  SearchParameters,
} from "@/features/search/model/searchParameters";
import { Repository } from "@/features/repository/model/repository";

export type Search = {
  totalCount: number;
  items: Repository[];
  incomplete_results: boolean;
};

export const $searchResult = createStore<Search>({
  totalCount: 0,
  items: [],
  incomplete_results: false,
});

export const invalidateResults = createEffect({
  handler: async (params: SearchParameters) => getSearchRepositories(params),
});

$searchResult.on(invalidateResults.done, (state, { result }) => result);

guard({
  source: $searchParameters,
  target: invalidateResults,
  filter: (params) => !!params.query,
});

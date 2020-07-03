import { createEffect, createStore } from "effector";

import { Repository } from "@/features/repository/model/repository";
import { SearchParameters } from "@/features/search/model/searchParameters";
import { getSearchRepositories } from "@/api/repositories";

export type SearchResults = {
  totalCount: number;
  items: Repository[];
  incomplete: boolean;
  timestamp: number | null;
};

export const $searchResults = createStore<SearchResults>({
  totalCount: 0,
  items: [],
  incomplete: false,
  timestamp: null,
});

export const invalidateResultsFx = createEffect({
  handler: (params: SearchParameters) => getSearchRepositories(params),
});

$searchResults.on(invalidateResultsFx.done, (state, { result }) => result);

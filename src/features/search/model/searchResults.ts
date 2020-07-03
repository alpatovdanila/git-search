import { createEffect, createStore, guard } from "effector";
import { Repository } from "@/features/repository/model/repository";
import {
  $searchParameters,
  SearchParameters,
} from "@/features/search/model/searchParameters";
import { getSearchRepositories } from "@/api/repositories";
import { searchPageGate } from "@/pages/search/searchPageGate";

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
}).reset(searchPageGate.close);

export const invalidateResultsFx = createEffect({
  handler: (params: SearchParameters) => getSearchRepositories(params),
});

$searchResults.on(invalidateResultsFx.done, (state, { result }) => result);

// When parameters changing, invalidate search results
guard({
  source: $searchParameters,
  filter: searchPageGate.status,
  target: invalidateResultsFx,
});

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
  incomplete: boolean;
  timestamp: number | null;
};

export const $searchResults = createStore<Search>({
  totalCount: 0,
  items: [],
  incomplete: false,
  timestamp: null,
});

export const fetchResultsFx = createEffect({
  handler: (params: SearchParameters) => getSearchRepositories(params),
});

$searchResults.on(fetchResultsFx.done, (state, { result }) => result);

guard({
  source: $searchParameters,
  filter: (params) => !!params.query && !!params.query.trim(),
  target: fetchResultsFx,
});

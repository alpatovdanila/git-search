import { get } from "@/api/client";
import type { SearchResults } from "@/features/search/model/searchResults";


type Response = {
  items: [];
  total_count: number;
  incomplete_results: boolean;
};

export type SearchOrder = "desc" | "asc";

export type SearchSort =
    | "stars"
    | "forks"
    | "updated"
    | "best-match"
    | "help-wanted-issues";



export type SearchParameters = {
  query: string;
  language: string | null;
  order: SearchOrder;
  sort: SearchSort;
  page: number;
  perPage: number;
};

const normalizeRepositoriesSearch = (response: Response): SearchResults => {
  const items = response.items.map((item) => {
    const {
      id,
      html_url,
      name,
      description,
      forks,
      stargazers_count,
      license,
      language,
      owner: { login: ownerName, url: ownerUrl },
    } = item;

    return {
      id,
      name,
      description,
      forks: forks,
      stars: stargazers_count,
      license,
      language,
      url: html_url,
      author: {
        name: ownerName,
        url: ownerUrl,
      },
    };
  });

  return {
    items,
    totalCount: response.total_count,
    incomplete: response.incomplete_results,
    timestamp: Date.now(),
  };
};

export const getSearchRepositories = ({
  query = "",
  language ,
  order ,
  sort,
  page = 1,
  perPage,
}: SearchParameters): Promise<SearchResults> => {
  return get<Response>("/search/repositories", {
    q: language ? `${query}+language:${language}` : query,
    order,
    sort,
    page,
    per_page: perPage,
  }).then(normalizeRepositoriesSearch);
};

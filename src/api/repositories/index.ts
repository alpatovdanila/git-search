import { get } from "@/api/client";
import type { SearchResults } from "@/features/search/model/searchResults";
import { SearchParameters } from "@/features/search/model/searchParameters";

type Response = {
  items: [];
  total_count: number;
  incomplete_results: boolean;
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
  language = null,
  order = null,
  sort = null,
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

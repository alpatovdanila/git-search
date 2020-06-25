import {get} from "@/api/client";
import type {Search} from "@/features/search/model/searchResults";
import {SearchParameters} from "@/features/search/model/searchParameters";


type Response = {
    items: [];
    total_count: number,
    incomplete_results: boolean,
};

const normalizeRepositoriesSearch = (response: Response): Search => {
    const items = response.items.map((item) => {
        const {
            id,
            html_url,
            full_name,
            description,
            forks,
            stargazers_count,
            license,
            language
        } = item;

        return {
            id,
            name: full_name,
            description,
            forks: forks,
            stars: stargazers_count,
            license,
            language,
            url: html_url
        }
    });

    return {
        items,
        totalCount: response.total_count,
        incomplete_results: response.incomplete_results,
    }
};

export const getSearchRepositories = ({
                                          query = "",
                                          language = null,
                                          order = null,
                                          sort = null,
                                          page = 1,
                                          perPage
                                      }: SearchParameters): Promise<Search> => {
    return get<Response>("/search/repositories", {
        q: language ? `${query}+language:${language}` : query,
        order,
        sort,
        page,
        perPage
    }).then(normalizeRepositoriesSearch)
}
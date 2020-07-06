import React, { useEffect } from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useGate, useStore } from "effector-react";
import { InternalTemplate } from "@/templates/internal";
import { FlexItem, FlexRow, CompactLogo, FlexCol } from "@/ui/";
import { RepositoryList } from "@/features/repository/components/repository-list";
import { Link } from "@/ui/link";
import { Paginator } from "@/ui/paginator";
import {
  searchParametersUpdated,
  $searchParameters,
} from "@/features/search/model/searchParameters";

import { searchPageGate } from "@/pages/search/searchPageGate";
import { pageMetaUpdated } from "@/app/model/pageMeta";
import { searchPageMeta } from "@/pages/meta";
import { $searchResults } from "@/features/search/model/searchResults";
import { SortSelect } from "@/features/search/components/sort-select";
import { SearchOrder, SearchSort } from "@/api/repositories";
import { SearchReport } from "@/features/search/components/search-report";

export const Search = () => {
  const parameters = useStore($searchParameters);
  const results = useStore($searchResults);

  useGate(searchPageGate);

  const handlePageChange = (page: number) => searchParametersUpdated({ page });

  const handleSubmit = (params: { query: string; language: string | null }) => {
    searchParametersUpdated({ ...params, page: 1 });
  };

  const handleSortChange = (sort: SearchSort) =>
    searchParametersUpdated({ sort });
  const handleOrderChange = (order: SearchOrder) =>
    searchParametersUpdated({ order });

  const pagesTotal = Math.round(
    Math.min(results.totalCount, 1000) / parameters.perPage
  );

  useEffect(() => {
    pageMetaUpdated(searchPageMeta(parameters.query));
  }, [parameters.query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [results.timestamp]);

  return (
    <InternalTemplate>
      <FlexCol spacing={48} block>
        <FlexItem block>
          <FlexRow block valignCenter spacing={24}>
            <FlexItem>
              <Link to={"/"}>
                <CompactLogo />
              </Link>
            </FlexItem>
            <FlexItem block>
              <SearchForm
                autoSubmitTimeout={250}
                onSubmit={handleSubmit}
                query={parameters.query}
                language={parameters.language}
              />
            </FlexItem>
          </FlexRow>
        </FlexItem>
        <FlexItem>
          <FlexRow spacing={20} block>
            <FlexItem block>
              <SearchReport results={results} />
            </FlexItem>
            <FlexItem>
              <SortSelect
                sort={parameters.sort}
                order={parameters.order}
                onOrderChange={handleOrderChange}
                onSortChange={handleSortChange}
              />
            </FlexItem>
          </FlexRow>
        </FlexItem>

        <FlexItem>
          <RepositoryList repositories={results.items} />
        </FlexItem>
        <FlexItem>
          <Paginator
            activePage={parameters.page}
            pagesCount={pagesTotal}
            onPageChange={handlePageChange}
          />
        </FlexItem>
      </FlexCol>
    </InternalTemplate>
  );
};

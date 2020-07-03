import React, { useEffect } from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useStore } from "effector-react";
import { InternalTemplate } from "@/templates/internal";
import {
  FlexItem,
  FlexRow,
  CompactLogo,
  FlexCol,
  Link,
  Paginator,
} from "@/ui/";
import { RepositoryList } from "@/features/repository/components/repository-list";

import { searchParametersUpdated } from "@/features/search/model/searchParameters";
import { $search, pageMounted } from "@/features/search/model";
import { pageMetaUpdated } from "@/app/model/pageMeta";
import { searchPageMeta } from "@/pages/meta";

export const Search = () => {
  const search = useStore($search);

  useEffect(() => {
    pageMetaUpdated(searchPageMeta(search.parameters.query));
  }, []);

  useEffect(() => pageMounted(), []);

  const handlePageChange = (page: number) => searchParametersUpdated({ page });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search.results.timestamp]);

  const pagesTotal = Math.round(
    Math.min(search.results.totalCount, 1000) / search.parameters.perPage
  );

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
                autoSubmitTimeout={350}
                onSubmit={(params) =>
                  searchParametersUpdated({ ...params, page: 1 })
                }
                query={search.parameters.query}
                language={search.parameters.language}
              />
            </FlexItem>
          </FlexRow>
        </FlexItem>
        <FlexItem>
          <RepositoryList repositories={search.results.items} />
        </FlexItem>
        <FlexItem>
          <Paginator
            activePage={search.parameters.page}
            pagesCount={pagesTotal}
            onPageChange={handlePageChange}
          />
        </FlexItem>
      </FlexCol>
    </InternalTemplate>
  );
};

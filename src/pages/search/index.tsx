import React, { useEffect } from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useStore } from "effector-react";
import { $searchResults } from "@/features/search/model/searchResults";

import { InternalTemplate } from "@/templates/internal";
import { FlexItem, FlexRow, CompactLogo, FlexCol } from "@/ui/";
import { RepositoryList } from "@/features/repository/components/repository-list";
import { Link } from "@/ui/link";
import { Paginator } from "@/ui/paginator";
import {
  $searchParameters,
  searchParametersUpdated,
} from "@/features/search/model/searchParameters";

export const Search = () => {
  const search = useStore($searchResults);
  const params = useStore($searchParameters);

  const handlePageChange = (page: number) => searchParametersUpdated({ page });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search.timestamp]);

  const pagesTotal = Math.round(
    Math.min(search.totalCount, 1000) / params.perPage
  );

  return (
    <InternalTemplate>
      <FlexCol spacing={48} block>
        <FlexItem block>
          <FlexRow block valignCenter spacing={24}>
            <FlexItem>
              <Link href={"/"}>
                <CompactLogo />
              </Link>
            </FlexItem>
            <FlexItem block>
              <SearchForm autoSubmitTimeout={350} />
            </FlexItem>
          </FlexRow>
        </FlexItem>
        <FlexItem>
          <RepositoryList repositories={search.items} />
        </FlexItem>
        <FlexItem>
          <Paginator
            activePage={params.page}
            pagesCount={pagesTotal}
            onPageChange={handlePageChange}
          />
        </FlexItem>
      </FlexCol>
    </InternalTemplate>
  );
};

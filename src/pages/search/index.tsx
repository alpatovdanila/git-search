import React, { useEffect } from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useStore } from "effector-react";
import { InternalTemplate } from "@/templates/internal";
import { FlexItem, FlexRow, CompactLogo, FlexCol } from "@/ui/";
import { RepositoryList } from "@/features/repository/components/repository-list";
import { Link } from "@/ui/link";
import { Paginator } from "@/ui/paginator";
import { searchParametersUpdated } from "@/features/search/model/searchParameters";
import {$search, pageMounted, pageUnmounted} from "@/features/search/model";

export const Search = () => {
  const search = useStore($search);

  useEffect(() =>{
    pageMounted();
    return ()=>pageUnmounted();
  }, []);

  const handlePageChange = (page: number) => searchParametersUpdated({ page });
  const handleSubmit = (params:{query:string, language:string|null}) => searchParametersUpdated({ ...params, page: 1 })


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
                onSubmit={handleSubmit}
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

import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useStore } from "effector-react";
import { $searchResult } from "@/features/search/model/searchResults";

import { InternalTemplate } from "@/templates/internal";
import { FlexItem, FlexRow, CompactLogo, FlexCol } from "@/ui/";
import { RepositoryList } from "@/features/repository/components/repository-list";
import { Link } from "@/ui/link";

export const Search = () => {
  const search = useStore($searchResult);

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
      </FlexCol>
    </InternalTemplate>
  );
};

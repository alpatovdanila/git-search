import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol, Logo } from "@/ui/";

import { IndexTemplate } from "@/templates/index";
import { searchParametersUpdated } from "@/features/search/model/searchParameters";

export const Index = () => {
  return (
    <IndexTemplate>
      <FlexCol col spacing={48} block alignCenter fullHeight>
        <FlexItem>
          <Logo />
        </FlexItem>
        <FlexItem block>
          <SearchForm
            query={""}
            autoSubmitTimeout={500}
            language={null}
            onSubmit={searchParametersUpdated}
          />
        </FlexItem>
      </FlexCol>
    </IndexTemplate>
  );
};

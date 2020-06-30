import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol, Logo } from "@/ui/";

import { IndexTemplate } from "@/templates/index";

export const Index = () => {
  return (
    <IndexTemplate>
      <FlexCol col spacing={48} block alignCenter fullHeight>
        <FlexItem>
          <Logo />
        </FlexItem>
        <FlexItem block>
          <SearchForm autoSubmitTimeout={500} />
        </FlexItem>
      </FlexCol>
    </IndexTemplate>
  );
};

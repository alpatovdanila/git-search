import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol, Logo } from "@/ui/";

import { IndexTemplate } from "@/templates/index";
import { searchParametersUpdated } from "@/features/search/model/searchParameters";
import {createLocationSearch} from "@/lib/locationSearch";

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
            onSubmit={(data : {query:string, language:string|null}) => window.history.pushState({}, '', '/search/?'+createLocationSearch(data))}
          />
        </FlexItem>
      </FlexCol>
    </IndexTemplate>
  );
};

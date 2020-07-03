import React, { useEffect } from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol, Logo } from "@/ui/";
import { IndexTemplate } from "@/templates/index";

import { pageMetaUpdated } from "@/app/model/pageMeta";
import { indexPageMeta } from "@/pages/meta";
import { createLocationSearch } from "@/lib/locationSearch";

export const Index = () => {
  useEffect(() => {
    pageMetaUpdated(indexPageMeta());
  }, []);

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
            onSubmit={(data: { query: string; language: string | null }) =>
              window.history.pushState(
                {},
                "",
                "/search/?" + createLocationSearch(data)
              )
            }
          />
        </FlexItem>
      </FlexCol>
    </IndexTemplate>
  );
};

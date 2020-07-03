import React, { useEffect } from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol, Logo } from "@/ui/";

import { IndexTemplate } from "@/templates/index";

import { createLocationSearch } from "@/lib/locationSearch";
import { pageMetaUpdated } from "@/app/model/pageMeta";
import { indexPageMeta } from "@/pages/meta";
import { useLocation } from "wouter";

export const Index = () => {
  useEffect(() => {
    pageMetaUpdated(indexPageMeta());
  }, []);

  const [_, setLocation] = useLocation();

  const handleFormSubmit = (data: {
    query: string;
    language: string | null;
  }) => {
    setLocation("/search/?" + createLocationSearch(data));
  };

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
            onSubmit={handleFormSubmit}
          />
        </FlexItem>
      </FlexCol>
    </IndexTemplate>
  );
};

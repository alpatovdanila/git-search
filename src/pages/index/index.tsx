import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol } from "@/ui/layout";
import { Logo } from "@/ui/logo";

export const Index = () => {
  return (
    <FlexCol col spacing={48} block alignCenter>
      <FlexItem>
        <Logo size={64} color={"gray"} />
      </FlexItem>
      <FlexItem block>
        <SearchForm autoSubmitTimeout={500} />
      </FlexItem>
      <FlexItem>Start searching</FlexItem>
    </FlexCol>
  );
};

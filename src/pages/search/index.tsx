import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useStore } from "effector-react";
import { $searchResult } from "@/features/search/model/searchResults";
import { Repository } from "@/ui/repository";
import { $transport } from "@/features/application/model/transport";
import { TalSpin } from "@/ui/icon";

export const Search = () => {
  const search = useStore($searchResult);
  const transport = useStore($transport);
  return (
    <>
      <SearchForm autoSubmitTimeout={350} />
      <h1>Search results</h1>
      {transport.fetching && <TalSpin color={"black"} spin />}
      {search.items.map((item) => (
        <Repository repository={item} />
      ))}
    </>
  );
};

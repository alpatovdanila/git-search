import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { useStore } from "effector-react";
import { $searchResult } from "@/features/search/model/searchResults";
import { Repository } from "@/ui/repository";
import { $transport } from "@/features/application/model/transport";
import { Animation } from "@/ui/animation";
import { HalfCircle } from "@/ui/icon";

export const Search = () => {
  const search = useStore($searchResult);
  const transport = useStore($transport);
  return (
    <>
      <SearchForm autoSubmitTimeout={350} />
      <h1>Search results</h1>
      {transport.fetching && (
        <Animation
          type={"rotate"}
          duration={1000}
          timing={"ease-in-out"}
          infinite
        >
          <HalfCircle />
        </Animation>
      )}

      {search.items.map((item) => (
        <Repository repository={item} />
      ))}
    </>
  );
};

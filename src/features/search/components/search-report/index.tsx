import React from "react";
import { SearchResults } from "@/features/search/model/searchResults";
import { TextLabel } from "@/ui";

export const SearchReport = ({ results }: { results: SearchResults }) => {
  return <>{results.totalCount} results found</>;
};

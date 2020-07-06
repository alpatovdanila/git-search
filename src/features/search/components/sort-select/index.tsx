import React from "react";
import {
  SortOption,
  sortOptions,
} from "@/features/search/components/sort-select/options";
import { FlexItem, FlexRow, Link } from "@/ui";
import { SearchOrder, SearchSort } from "@/api/repositories";

type Props = {
  sort: SearchSort;
  order: SearchOrder;
  onOrderChange: (order: SearchOrder) => void;
  onSortChange: (sort: SearchSort) => void;
};

const invertOrder = (order: SearchOrder): SearchOrder =>
  order === "desc" ? "asc" : "desc";

const orderArrow = (order: SearchOrder) => (order === "desc" ? "🠗" : "↑");

export const SortSelect = ({
  sort = "best-match",
  onSortChange,
  order = "desc",
  onOrderChange,
}: Props) => {
  const handleSortSelect = (sortOption: SortOption) => {
    if (!!onOrderChange && sort === sortOption.sort)
      onOrderChange(invertOrder(order));
    else {
      onSortChange(sortOption.sort);
    }
  };

  return (
    <FlexRow spacing={16}>
      {sortOptions.map((option) => (
        <FlexItem key={option.label}>
          <Link
            variant={"select"}
            onClick={() => handleSortSelect(option)}
            active={sort === option.sort}
          >
            {option.label}
            {sort === option.sort && orderArrow(order)}
          </Link>
        </FlexItem>
      ))}
    </FlexRow>
  );
};

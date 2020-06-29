import React from "react";
import {
  OrderOptions,
  SortOptions,
} from "@/features/search/components/sort-select/options";
import { Select } from "@/ui/select";
import {
  $searchParameters,
  Order,
  searchParametersUpdated,
  Sort,
} from "@/features/search/model/searchParameters";
import { useStore } from "effector-react";

export const SortSelect = () => {
  const store = useStore($searchParameters);

  const handleOrderChange = (order: Order | null) =>
    searchParametersUpdated({ order });
  const handleSortChange = (sort: Sort | null) =>
    searchParametersUpdated({ sort });

  return (
    <>
      <Select<Sort>
        options={SortOptions}
        value={store.sort}
        onChange={handleSortChange}
      />
      <Select<Order>
        options={OrderOptions}
        value={store.order}
        onChange={handleOrderChange}
      />
    </>
  );
};

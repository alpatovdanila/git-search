import { SelectOptions } from "@/ui/select";
import { Order, Sort } from "@/features/search/model/searchParameters";

export const SortOptions: SelectOptions<Sort> = [
  { value: "stars", label: "Stars", key: "stars" },
  { value: "updated", label: "Updated", key: "updated" },
  { value: "forks", label: "Forks", key: "forks" },
  { value: "best-match", label: "Best match", key: "bm" },
  { value: "help-wanted-issues", label: "«Help wanted»  issues", key: "hwi" },
];

export const OrderOptions: SelectOptions<Order> = [
  { value: "asc", label: "↑", key: "asc" },
  { value: "desc", label: "↓", key: "desc" },
];

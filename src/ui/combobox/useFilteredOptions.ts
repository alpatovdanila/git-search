// Filter options
import { useMemo } from "react";
import { ComboboxOption, ComboboxOptions } from "@/ui/";

export const useFilteredOptions = (
  options: ComboboxOptions,
  query: string | null
) => {
  return useMemo<ComboboxOption[]>(() => {
    return options.filter((option: ComboboxOption) => {
      if (!query || !query.trim()) return true;
      return (
        !!option.value &&
        option.value.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });
  }, [query, options]);
};

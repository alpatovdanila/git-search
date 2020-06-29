import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol } from "@/ui/layout";
import { Logo } from "@/ui/logo";
import { LanguageSelect } from "@/features/search/components/language-select";
import { useStore } from "effector-react";
import { $languages } from "@/features/search/model/languages";
import { Combobox, ComboboxOptions } from "@/ui/combobox";
import { InputText } from "@/ui/input-text";

const options: ComboboxOptions = Array.from({ length: 10 }, (_, i) => ({
  value: `${i}`,
  label: `${i}`,
}));

export const Index = () => {
  const languages = useStore($languages);
  return (
    <>
      <Combobox options={options} value={"0"} onChange={console.log} />
      <InputText size={"xl"} />
      <InputText size={"l"} />
      <InputText transparent />
      <FlexCol col spacing={48} block>
        <FlexItem>
          <Logo size={64} fill={"gray"} />
        </FlexItem>
        <FlexItem block>
          <SearchForm autoSubmitTimeout={500} />
        </FlexItem>
        <FlexItem>Start searching</FlexItem>
      </FlexCol>
    </>
  );
};

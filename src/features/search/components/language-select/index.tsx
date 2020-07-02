import React from "react";
import { Languages } from "@/features/application/model/languages";
import { Combobox } from "@/ui/";

type Props = {
  languages: Languages;
  activeLanguage: string | null;
  onChange: (language: string | null) => void;
};

export const LanguageSelect = ({
  languages,
  activeLanguage = null,
  onChange,
}: Props) => {
  const languageOptions = React.useMemo(() => {
    const options = languages.map((language) => ({
      key: language.name,
      value: language.aliases[0],
      label: language.name,
    }));

    return [
      {
        value: null,
        label: "Any language",
      },
      ...options,
    ];
  }, [languages.length]);

  return (
    <Combobox
      options={languageOptions}
      value={activeLanguage}
      onChange={onChange}
      placeholder={"Specify language"}
      size={"xl"}
      transparent
      block
    />
  );
};

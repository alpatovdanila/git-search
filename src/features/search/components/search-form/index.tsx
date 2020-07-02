import React, { useEffect, useState, useRef } from "react";
import { useStore } from "effector-react";
import { $languages } from "@/features/application/model/languages";
import styles from "./search-form.module.scss";
import cn from "classnames";
import { LanguageSelect } from "@/features/search/components/language-select";
import { InputText, Search, FlexItem, FlexRow } from "@/ui/";

type Props = {
  autoSubmitTimeout: number;
  query: string;
  language: string | null;
  onSubmit: ({
    language,
    query,
  }: {
    language: string | null;
    query: string;
  }) => void;
};

export const SearchForm = ({
  autoSubmitTimeout = 250,
  query: initialQuery,
  language: initialLanguage,
  onSubmit,
}: Props) => {
  const languages = useStore($languages);
  const [language, setLanguage] = useState(initialLanguage);
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   onSubmit({ language, query: query.trim() });
  // }, [language, query.trim()]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !!query.trim())
      onSubmit({ language, query: query.trim() });
  };

  useEffect(() => {
    setQuery(initialQuery);
    setLanguage(initialLanguage);
  }, [initialQuery, initialLanguage]);

  const cns = cn(styles.searchForm, { [styles.focused]: focused });

  return (
    <div className={cns}>
      <FlexRow block valignCenter spacing={8}>
        <FlexItem>
          <div className={styles.icon}>
            <Search />
          </div>
        </FlexItem>
        <FlexItem block>
          <InputText
            ref={inputRef}
            size={"xl"}
            transparent
            block
            value={query}
            onChange={(e: React.KeyboardEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
            debounceChangeTimeout={autoSubmitTimeout}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
            placeholder={"Repository name or keywords"}
            onKeyDown={handleKeyDown}
          />
        </FlexItem>
        <FlexItem>
          <LanguageSelect
            languages={languages}
            activeLanguage={language}
            onChange={setLanguage}
          />
        </FlexItem>
      </FlexRow>
    </div>
  );
};

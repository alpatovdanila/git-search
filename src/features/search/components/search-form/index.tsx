import React, { useEffect, useState, useRef } from "react";
import { useStore } from "effector-react";
import { $languages } from "@/app/model/languages";
import styles from "./search-form.module.scss";
import cn from "classnames";
import { LanguageSelect } from "@/features/search/components/language-select";
import { FlexItem, FlexRow, InputText, Search } from "@/ui/";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value.trim());
  };

  useEffect(() => {
    setQuery(initialQuery);
    setLanguage(initialLanguage);
  }, [initialQuery, initialLanguage]);

  // Debounced auto-submit
  useEffect(() => {
    const t = setTimeout(() => {
      if (query) onSubmit({ language, query });
    }, autoSubmitTimeout);
    return () => clearTimeout(t);
  }, [autoSubmitTimeout, query, language]);

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
            value={query}
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={"Repository name or keywords"}
            size={"xl"}
            ref={inputRef}
            transparent
            autoFocus
            block
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

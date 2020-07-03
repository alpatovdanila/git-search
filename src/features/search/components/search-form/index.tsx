import React, { useEffect, useState, useRef, useMemo } from "react";
import { useStore } from "effector-react";
import { $languages } from "@/app/model/languages";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.currentTarget.value);

  useEffect(() => {
    const t = setTimeout(() => {
      const changed = language !== initialLanguage || query !== initialQuery;
      query && changed && onSubmit({ language, query });
    }, autoSubmitTimeout);
    return () => clearTimeout(t);
  }, [language, query]);

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
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
            placeholder={"Repository name or keywords"}
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

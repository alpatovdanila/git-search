import React, { useEffect, useState, useRef } from "react";
import { useStore } from "effector-react";
import { $languages } from "@/features/search/model/languages";
import {
  $searchParameters,
  searchParametersUpdated,
} from "@/features/search/model/searchParameters";
import styles from "./search-form.module.scss";
import cn from "classnames";
import { LanguageSelect } from "@/features/search/components/language-select";
import { InputText } from "@/ui/input-text";
import { FlexItem, FlexRow } from "@/ui/layout";
import { Search } from "@/ui/icon";

export const SearchForm = ({ autoSubmitTimeout = 250 }) => {
  const languages = useStore($languages);
  const searchParams = useStore($searchParameters);
  const [language, setLanguage] = useState(searchParams.language);
  const [query, setQuery] = useState(searchParams.query);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newParams = {
      language: searchParams.query ? language : undefined,
      query: query && query.trim() ? query : undefined,
    };
    query && query.trim() && searchParametersUpdated(newParams);
  }, [language, query]);

  const cns = cn(styles.searchForm, { [styles.focused]: focused });

  return (
    <div className={cns}>
      <FlexRow block valignCenter>
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
            onDebouncedChange={setQuery}
            debounceChangeTimeout={autoSubmitTimeout}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
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

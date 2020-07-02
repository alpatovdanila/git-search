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
import { InputText, Search, FlexItem, FlexRow } from "@/ui/";

export const SearchForm = ({ autoSubmitTimeout = 250 }) => {
  const languages = useStore($languages);
  const searchParams = useStore($searchParameters);
  const [language, setLanguage] = useState(searchParams.language);
  const [query, setQuery] = useState(searchParams.query);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!!query) {
      searchParametersUpdated({
        language,
        query,
        page: 1,
      });
    }
  }, [language, query]);

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
            onDebouncedChange={setQuery}
            debounceChangeTimeout={autoSubmitTimeout}
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

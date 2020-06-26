import React, {useEffect, useState, useRef} from "react";
import {useStore} from "effector-react";
import {$languages} from "@/features/search/model/languages";
import {$searchParameters, searchParametersUpdated} from "@/features/search/model/searchParameters";
import styles from './search-form.module.scss';
import {LanguageSelect} from "@/features/search/components/language-select";
import {InputText} from "@/ui/input-text";


export const SearchForm = ({autoSubmitTimeout = 250}) => {
    const languages = useStore($languages);
    const searchParams = useStore($searchParameters);
    const [language, setLanguage] = useState(searchParams.language);
    const [query, setQuery] = useState(searchParams.query);

    useEffect(() => {
        // TODO: IMPORTANT! forwarded effect triggers 2x times resulting in 2 fetch requests
        if (searchParams.query) searchParametersUpdated({language});
        if (query && query.trim()) searchParametersUpdated({query});
    }, [language, query]);

    return <div className={styles.searchForm}>
        <div className={styles.input}>
            <InputText
                value={query}
                onDebouncedChange={setQuery}
                debounceChangeTimeout={autoSubmitTimeout}

            />
        </div>
        <div className={styles.select}>
            <LanguageSelect
                languages={languages}
                activeLanguage={language}
                onChange={setLanguage}
            />
        </div>
    </div>
}
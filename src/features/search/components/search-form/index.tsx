import React, {useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$languages} from "@/features/search/model/languages";
import {$searchParameters, searchParametersUpdated} from "@/features/search/model/searchParameters";
import {InputText} from "@/ui/input-text";
import {LanguageSelect} from "@/features/search/components/language-select";


export const SearchForm = ({submitTimeout = 250}) => {
    const languages = useStore($languages);
    const searchParams = useStore($searchParameters);
    const [query, setQuery] = useState(searchParams.query);
    const [language, setLanguage] = useState(searchParams.language);

    const submitQuery = () => {
        if (query) searchParametersUpdated({query});
    }

    const submitLanguage = () => {
        if (!!searchParams.query) searchParametersUpdated({language});
        setQuery(searchParams.query);
    }

    useEffect(submitLanguage, [language]);

    useEffect(() => {
        const timeout = setTimeout(submitQuery, submitTimeout);
        return () => clearTimeout(timeout);
    }, [query]);


    return <>
        <LanguageSelect languages={languages} activeLanguage={language} onChange={setLanguage}/>
        <InputText value={query} onChange={e => setQuery(e.currentTarget.value)} onEnter={submitQuery}/>
    </>

}
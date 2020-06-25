import React from "react";
import {Languages} from "@/features/search/model/languages";
import {Select, SelectOptions} from "@/ui/select";

type Props = {
    languages: Languages,
    activeLanguage: string | null,
    onChange: (language: string | null) => void
}

export const LanguageSelect = ({languages, activeLanguage = null, onChange}:Props) => {

    const languageOptions: SelectOptions<string> = languages.map(language => ({
        key:language.name,
        value:language.aliases[0],
        label:language.name
    }));

    return <Select options={languageOptions} value={activeLanguage} onChange={onChange} emptyItem={"Any language"}/>
}
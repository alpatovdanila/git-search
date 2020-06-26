import React from "react";
import {Languages} from "@/features/search/model/languages";
import {Combobox} from "@/ui/combobox";

type Props = {
    languages: Languages,
    activeLanguage: string | null,
    onChange: (language: string | null) => void
}

export const LanguageSelect = ({languages, activeLanguage = null, onChange}:Props) => {

    const languageOptions = React.useMemo(()=>{
        return languages.map(language => ({
            key:language.name,
            value:language.aliases[0],
            label:language.name
        }));
    }, [languages.length]);

    return <Combobox options={languageOptions} value={activeLanguage} onChange={onChange} emptyItem={"Any language"} transparent/>
}
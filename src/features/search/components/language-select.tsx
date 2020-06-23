import React from "react";
import {Language, Languages} from "@/features/search/model/languages";

type Props = {
    languages: Languages,
    onLanguageChanged: (language: Language | null) => void,
    activeLanguage?: Language | null
}

export const LanguageSelect = ({languages, onLanguageChanged, activeLanguage = null}: Props) => {

    const selectValue = activeLanguage ? activeLanguage.name : '';

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = languages.find(lang => lang.name === e.target.value);
        onLanguageChanged(lang ? lang : null);
    }

    return <select value={selectValue} onChange={handleSelectChange}>
        <option value={""}>Any language</option>
        {languages.map(({name}) => (
            <option key={name} value={name}>{name}</option>
        ))}
    </select>
}
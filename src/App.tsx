import React, {useEffect} from "react";
import "./styles.css";
import {combine} from "effector";
import {$searchParameters, searchParametersUpdated} from "@/features/search/model/searchParameters";
import {applicationStarted} from "@/features/common/model/application";

import {$transport} from "@/features/common/model/transport";
import {$application} from "@/features/common/model/application";

import {$emojis} from "@/features/search/model/emojis";
import {$languages} from "@/features/search/model/languages";
import {useStore} from "effector-react";
import {LanguageSelect} from "@/features/search/components/language-select";
import {$searchResult} from "@/features/search/model/searchResults";

const $store = combine({
    emojis: $emojis,
    languages: $languages,
    app: $application,
    transport: $transport,
    search: combine({
        result: $searchResult,
        parameters: $searchParameters,
    })
});

$store.watch(console.log);


export default function App() {
    useEffect(() => applicationStarted(), []);
    const store = useStore($store);

    return (
        <div className="App">
            <LanguageSelect
                languages={store.languages}
                onLanguageChanged={language => searchParametersUpdated({language})}
                activeLanguage={store.search.parameters.language}
            />
            {store.app.ready && 'App is ready'}
            {store.transport.fetching && 'Fetching'}
            {store.transport.errors.map(error => error)}
            <input
                type="text"
                onChange={e => searchParametersUpdated({query: e.target.value})}

            />

            <h2>Start editing to see some magic happen!</h2>
        </div>
    );
}

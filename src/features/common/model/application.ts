import {combine, createEvent, createStore, forward, Store} from 'effector';
import {$emojis, fetchEmojisFx} from "@/features/search/model/emojis";
import {$languages, fetchLanguagesFx} from "@/features/search/model/languages";

export type Application = {
    ready: boolean,
    started:Store<boolean>,
}

const ready = combine($emojis, $languages, (emojis, languages) => !!Object.keys(emojis).length && !!languages.length);

const started = createStore<boolean>(false);

export const $application = combine({ready, started});

export const applicationStarted = createEvent();

started.on(applicationStarted, ()=>true);

forward({
    from:applicationStarted,
    to:[fetchEmojisFx, fetchLanguagesFx]
});



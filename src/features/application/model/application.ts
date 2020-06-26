import {createEffect, createEvent, createStore, forward, sample} from 'effector';
import {fetchEmojisFx} from "@/features/search/model/emojis";
import {fetchLanguagesFx} from "@/features/search/model/languages";


export type Application = {
    ready: boolean,
    started:boolean,
}

export const $application = createStore<Application>({
    ready:false,
    started:false
})

export const applicationStarted = createEvent();

export const preloadAppFx = createEffect().use(()=>Promise.all([fetchLanguagesFx(), fetchEmojisFx()]));

$application.on(applicationStarted, (state)=> ({...state, started:true}) );
$application.on(preloadAppFx.done, (state)=> ({...state, ready:true }) );

forward({
    from:applicationStarted,
    to:preloadAppFx
});




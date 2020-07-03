import { createEffect, createEvent, createStore, forward } from "effector";
import { fetchEmojisFx } from "@/app/model/emojis";
import { fetchLanguagesFx } from "@/app/model/languages";

export type Application = {
  ready: boolean;
  started: boolean;
};

export const $application = createStore<Application>({
  ready: false,
  started: false,
});

export const applicationStarted = createEvent();
$application.on(applicationStarted, (state) => ({ ...state, started: true }));

const preloadAppFx = createEffect().use(() =>
  Promise.all([fetchLanguagesFx(), fetchEmojisFx()])
);
$application.on(preloadAppFx.done, (state) => ({ ...state, ready: true }));

forward({
  from: applicationStarted,
  to: preloadAppFx,
});

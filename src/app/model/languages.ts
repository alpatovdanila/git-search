import { createEffect, createStore } from "effector";

import { getLanguages } from "@/api/languages";

export type Language = {
  name: string;
  aliases: string[];
};

export type Languages = Language[];

export const $languages = createStore<Languages>([]);

export const fetchLanguagesFx = createEffect({
  handler: async () => getLanguages(),
});

$languages.on(fetchLanguagesFx.done, (state, { result }) => result);

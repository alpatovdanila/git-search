import { createEffect, createStore } from "effector";
import { getEmojis } from "@/api/emojis";

export type Emojis = { [key: string]: string };

export const $emojis = createStore<Emojis>({});

export const fetchEmojisFx = createEffect({
  handler: async () => getEmojis(),
});

$emojis.on(fetchEmojisFx.done, (state, { result }) => result);

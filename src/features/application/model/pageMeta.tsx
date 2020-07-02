import { createEffect, createEvent, createStore, forward } from "effector";

export type PageMeta = {
  title: string;
};

export const $pageMeta = createStore<PageMeta>({
  title: "",
});

export const pageMetaUpdated = createEvent<Partial<PageMeta>>();

const updatePageMetaFx = createEffect({
  handler: (meta: PageMeta) => {
    const titleEl = document.querySelector("title");
    if (titleEl) titleEl.innerText = meta.title;
  },
});

forward({
  from: $pageMeta,
  to: updatePageMetaFx,
});

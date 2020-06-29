import { createStore, createEvent } from "effector";

export type Transport = {
  fetching: boolean;
  errors: string[];
};

export const errorHappened = createEvent<string>();

export const exceptionThrown = errorHappened.prepend(
  (error: Error) => error.message
);

export const fetchingStatusChanged = createEvent<boolean>();

export const $transport = createStore<Transport>({
  fetching: false,
  errors: [],
});

$transport
  .on(errorHappened, (state, error) => ({
    ...state,
    errors: [...state.errors, error],
  }))
  .on(fetchingStatusChanged, (state, status) => ({
    ...state,
    fetching: status,
  }));

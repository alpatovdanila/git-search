import { createStore, createEvent, combine } from "effector";
import { requestFx } from "@/api/client";

const $errors = createStore<string[]>([]);

export const errorHappened = createEvent<string>();

export const exceptionThrown = errorHappened.prepend(
  (error: Error) => error.message
);

$errors.on(errorHappened, (state, error) => [...state, error]);

requestFx.fail.watch((payload) => exceptionThrown(payload.error));

export const $transport = combine({
  fetching: requestFx.inFlight,
  errors: $errors,
});

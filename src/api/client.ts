import { createClient, Request } from "../lib/HTTPClient";
import appConfig from "../config";
import { createLocationSearch } from "../lib/locationSearch";
import { createEffect } from "effector";

const basicAuthHeader = {
  Authorization:
    "Basic " + btoa(`${appConfig.github.username}:${appConfig.github.secret}`),
};

const client = createClient({
  baseUrl: "https://api.github.com",
  headers: { ...basicAuthHeader },
});

export const requestFx = createEffect({
  handler: (params: Request) => client(params),
});

export const get = <T>(
  path = "",
  parameters: object | null = null
): Promise<T> => {
  // Todo: find a better way to pass + and : symbols "as is" to query url. Suppressing encoding for now;
  const searchString = !!parameters
    ? "?" + createLocationSearch(parameters, true)
    : "";
  return requestFx({ method: "GET", path: path + searchString });
};

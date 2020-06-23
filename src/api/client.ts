import {createClient, Request} from "../lib/HTTPClient";
import appConfig from "../config";
import { createLocationSearch } from "../lib/locationSearch";

import {exceptionThrown, fetchingStatusChanged} from "@/features/common/model/transport";

const basicAuthHeader = {
  Authorization: btoa(`${appConfig.github.username}:${appConfig.github.secret}`)
};

const client = createClient({
  baseUrl: "https://api.github.com",
  headers: { ...basicAuthHeader }
});

export const request = (request:Request) => {
  fetchingStatusChanged(true);
  return client(request)
      .catch((e)=>{
        exceptionThrown(e);
        throw e;
      })
      .finally(()=>fetchingStatusChanged(false));
}

export const get = <T>(path: string = "", parameters = {}): Promise<T> => {
  const searchString = parameters ? "?" + createLocationSearch(parameters) : "";
  return request({ method: "GET", path: path + searchString });
};

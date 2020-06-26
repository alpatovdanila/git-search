import {createClient, Request} from "../lib/HTTPClient";
import appConfig from "../config";
import {createLocationSearch} from "../lib/locationSearch";

import {exceptionThrown, fetchingStatusChanged} from "@/features/application/model/transport";

const basicAuthHeader = {
    Authorization: 'Basic ' + btoa(`${appConfig.github.username}:${appConfig.github.secret}`),

};

const client = createClient({
    baseUrl: "https://api.github.com",
    headers: {...basicAuthHeader}
});

export const request = (request: Request) => {
    fetchingStatusChanged(true);
    return client(request)
        .catch((e) => {
            exceptionThrown(e);
            throw e;
        })
        .finally(() => fetchingStatusChanged(false));
}


export const get = <T>(path = "", parameters: object | null = null): Promise<T> => {
    // Todo: find a better way to pass + and : symbols "as is" to query url. Suppressing encoding for now;
    const searchString = !!parameters ? "?" + createLocationSearch(parameters, true) : "";
    return request({method: "GET", path: path + searchString});
};

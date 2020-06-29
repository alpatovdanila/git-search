type HTTPClient = (options: Request) => Promise<any>;

export type HTTPClientConfig = {
  baseUrl: string;
  headers?: object;
  options?: object;
};

export type Request = {
  method: "POST" | "GET";
  path: string;
  headers?: object;
  body?: object;
  options?: object;
};

export const createClient = ({
  baseUrl = "",
  headers: clientHeaders = {},
  options: clientOptions = {},
}: HTTPClientConfig): HTTPClient => {
  const client = async ({
    method,
    path,
    headers: requestHeaders = {},
    body: requestBody,
    options: requestOptions = {},
  }: Request) => {
    const fetchOptions: object = {
      method,
      headers: {
        ...requestHeaders,
        ...clientHeaders,
      },
      ...requestOptions,
      ...clientOptions,
      body: requestBody,
    };

    const response = await fetch(baseUrl + path, fetchOptions);

    if (response.status >= 200 && response.status <= 299) {
      return await response.json();
    } else {
      const error = await response.json();
      throw Error(error.message);
    }
  };

  return client;
};

export const createLocationSearch = (
  pairs: { [key: string]: any },
  suppressEncoding = false
): string => {
  const params = new URLSearchParams();

  for (const key in pairs) {
    if (pairs[key]) params.append(key, pairs[key]);
  }

  return suppressEncoding
    ? decodeURIComponent(params.toString())
    : params.toString();
};

export const getLocationSearchParams = (
  url: string
): { [key: string]: string } => {
  const extracted = {};
  const searchParams = new URLSearchParams(url);

  for (const [key, value] of searchParams.entries()) {
    if (value) extracted[key] = value;
  }
  return extracted;
};

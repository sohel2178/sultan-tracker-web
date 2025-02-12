import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface UrlRemoveQueryParams {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const queryString = qs.parse(params);

  queryString[key] = value;
  //   console.log(currentUrl);

  return qs.stringifyUrl({ url: window.location.pathname, query: queryString });
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: UrlRemoveQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    { url: window.location.pathname, query: queryString },
    { skipNull: true }
  );
};

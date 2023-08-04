import { Data, mapFormData } from './mapFormData';
import { mapObjectToArrayIfKeysAreNumbers } from './mapObjectToArrayIfKeysAreNumbers';

export const getRequestSearchData = <T = any>(request: Request) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const entries = Object.fromEntries(search.entries());
  return getDatFromEntries<T>(entries);
};

export const getRequestFormData = async <T = any>(request: Request) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData) as Record<string, string | undefined>;
  return getDatFromEntries<T>(entries);
};

const getDatFromEntries = <T = any>(entries: Record<string, string | undefined>) => {
  let result: Data<T> = {};
  for (const entry in entries) {
    const element = entries[entry];
    if (element) {
      mapFormData(result, entry, element);
    }
  }

  const data = mapObjectToArrayIfKeysAreNumbers(result);
  if (Array.isArray(data) && data.length === 0) {
    return undefined;
  }
  return data as T;
};

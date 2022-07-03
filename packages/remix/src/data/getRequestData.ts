import { mapFormData } from './mapFormData';
import { mapObjectToArrayIfKeysAreNumbers } from './mapObjectToArrayIfKeysAreNumbers';

export type Data<T> = {
  [P in keyof T]?: T[P] extends string[] ? string[] : T[P] extends Record<string, any> ? Data<T[P]> : string;
};

export const getRequestData = async <T = any>(request: Request) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData) as Record<string, string | undefined>;
  let result: Data<T> = {};
  for (const entry in entries) {
    const element = entries[entry];
    if (element) {
      mapFormData(result, entry, element);
    }
  }

  return mapObjectToArrayIfKeysAreNumbers(result) as T;
};

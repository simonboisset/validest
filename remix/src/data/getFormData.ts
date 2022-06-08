import { mapFormData } from './mapFormData';
import { mapObjectToArrayIfKeysAreNumbers } from './mapObjectToArrayIfKeysAreNumbers';

export type Data<T> = {
  [P in keyof T]?: T[P] extends string[] ? string[] : T[P] extends Record<string, any> ? Data<T[P]> : string;
};
export const getFormData = (target: React.BaseSyntheticEvent<any>['target']) => {
  const data = new FormData(target);
  const keys = data.keys();
  let entries: Record<string, any> = {};
  let key = keys.next();
  while (!key.done) {
    entries[key.value] = data.get(key.value);
    key = keys.next();
  }

  let result = {};
  for (const entry in entries) {
    const element = entries[entry];
    if (element) {
      mapFormData(result, entry, element);
    }
  }

  return mapObjectToArrayIfKeysAreNumbers(result) as any;
};

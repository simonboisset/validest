import { mapFormData } from './mapFormData';
import { mapObjectToArrayIfKeysAreNumbers } from './mapObjectToArrayIfKeysAreNumbers';

export const getFormData = (target: EventTarget) => {
  const data = new FormData(target as HTMLFormElement);
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

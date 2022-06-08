import { parseNumber } from '@ts-v/core';

export type Data<T> = {
  [P in keyof T]?: T[P] extends string[] ? string[] : T[P] extends Record<string, any> ? Data<T[P]> : string;
};

const get = async (request: Request) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData) as Record<string, string | undefined>;
  let result: Data<unknown> = {};
  for (const entry in entries) {
    const element = entries[entry];
    if (element) {
      mapFormData(result, entry, element);
    }
  }

  return mapObjectToArrayIfKeysAreNumbers(result) as unknown;
};

const mapObjectToArrayIfKeysAreNumbers = <T>(data: Data<T>) => {
  const keys = Object.keys(data) as (keyof Data<T>)[];
  if (!Array.isArray(data) && typeof data === 'object') {
    if (keys.every((k) => parseNumber(k) !== undefined)) {
      const arrayValue: Data<T>[] = [];
      keys.map(parseNumber).sort();
      for (const k of keys) {
        let element = data[k] as any;
        if (element) {
          arrayValue.push(mapObjectToArrayIfKeysAreNumbers(element) as any);
        }
      }
      return arrayValue;
    } else {
      let res = data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key] as any;
          if (element) {
            res[key] = mapObjectToArrayIfKeysAreNumbers(element) as any;
          }
        }
      }
      return res;
    }
  }
  return data;
};

const mapFormData = (data: Data<any>, key: string, value: string | undefined) => {
  const [firstKey, ...nestedKeys] = key.split('-');
  if (nestedKeys.length > 0) {
    if (!data[firstKey]) {
      data[firstKey] = {};
    } else if (Array.isArray(data[firstKey] && parseNumber(nestedKeys[0]) === undefined)) {
      throw new Error('[Get form data] Value is Array but key is not a number.');
    }

    mapFormData(data[firstKey] as Data<any>, nestedKeys.join('-'), value);
  } else {
    if (!data[firstKey]) {
      data[firstKey] = value;
    }
  }
};

export default get;

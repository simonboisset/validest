const parseNumber = (value: unknown) => {
  const n = typeof value === 'string' ? (!value ? undefined : Number(value.replace(',', '.'))) : value;
  if (typeof n !== 'number' || (n !== 0 && !n)) {
    return undefined;
  }
  return n;
};

export type Data<T> = {
  [P in keyof T]?: T[P] extends string[] ? string[] : T[P] extends Record<string, any> ? Data<T[P]> : string;
};
export const getFormData = <T>(target: React.BaseSyntheticEvent<any>['target']) => {
  const data = new FormData(target);
  const keys = data.keys();
  let entries: Record<string, any> = {};
  let key = keys.next();
  while (!key.done) {
    entries[key.value] = data.get(key.value);
    key = keys.next();
  }

  let result: Data<T> = {};
  for (const entry in entries) {
    const element = entries[entry];
    if (element) {
      mapFormData(result, entry, element);
    }
  }

  return mapObjectToArrayIfKeysAreNumbers(result) as T;
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

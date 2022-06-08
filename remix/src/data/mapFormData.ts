import { parseNumber } from '@ts-v/core';
import { Data } from './getRequestData';

export const mapFormData = (data: Data<any>, key: string, value: string | undefined) => {
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

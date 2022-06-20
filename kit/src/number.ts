import { Schema } from '@ts-v/core';

export const parseNumber = (value: unknown) => {
  const n = typeof value === 'string' ? (!value ? undefined : Number(value.replace(',', '.'))) : value;
  if (typeof n !== 'number' || (n !== 0 && !n)) {
    return undefined;
  }
  return n;
};

export const number =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined) {
      return { errors: error || 'number' };
    }
    return { data: n };
  };

export const int =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined || n < 0 || n !== parseInt(n.toString())) {
      return { errors: error || 'integer' };
    }
    return { data: n };
  };

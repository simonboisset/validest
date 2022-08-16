import { array } from '.';
import type { Schema } from '@ts-v/core';

export const string =
  (error?: string): Schema<string> =>
  (value) =>
    typeof value === 'string' && value.length > 0 ? { data: value } : { errors: error || 'string' };

export const parseNumber = (value: unknown) => {
  const n = typeof value === 'string' ? (!value ? undefined : Number(value.replace(',', '.'))) : value;
  if (typeof n !== 'number' || (n !== 0 && !n)) {
    return undefined;
  }
  return n;
};

const isOneOf = <T extends string>(options: T[], value: unknown): value is T =>
  typeof value === 'string' && options.includes(value as T);

export const oneOf =
  <T extends string>(options: T[], error?: string): Schema<T> =>
  //@ts-ignore
  (value: unknown) =>
    isOneOf(options, value) ? { data: value } : { errors: error || 'oneOf' };

export const date =
  (error?: string): Schema<Date> =>
  (value) => {
    try {
      if (typeof value === 'string' || typeof value === 'number') {
        const dateValue = new Date(value);
        if (dateValue instanceof Date && !isNaN(dateValue.valueOf())) {
          return { data: dateValue };
        }
      } else if (value instanceof Date && !isNaN(value.valueOf())) {
        return { data: value };
      }
      return { errors: error || 'date' };
    } catch (err) {
      return { errors: error || 'date' };
    }
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

test('shoud return array error', () => {
  const params = {
    name: 'joe',
    list: { notAnArray: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'] },
  };
  const { errors } = array(string())(params);
  expect(errors).toBe('array');
});

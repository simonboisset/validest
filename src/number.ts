import type { Schema } from './object';

export const parseNumber = (value: unknown) => {
  const n = typeof value === 'string' ? (!value ? undefined : Number(value.replace(',', '.'))) : value;
  if (typeof n !== 'number' || (n !== 0 && !n)) {
    return undefined;
  }
  return n;
};

export const number: Schema<number> = (value) => {
  const n = parseNumber(value);

  if (n === undefined) {
    return { errors: 'This field must be a number' };
  }
  return { data: n };
};

export const int: Schema<number> = (value) => {
  const n = parseNumber(value);

  if (n === undefined || n < 0 || n !== parseInt(n.toString())) {
    return { errors: 'This field must be an integer' };
  }
  return { data: n };
};

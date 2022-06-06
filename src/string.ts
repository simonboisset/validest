import type { Schema } from './object';

export const string: Schema<string> = (value) =>
  typeof value === 'string' && value.length > 0 ? { data: value } : { errors: 'This field must be a string' };

const isOneOf = <T extends string>(options: T[], value: unknown): value is T =>
  typeof value === 'string' && options.includes(value as T);

export const oneOf =
  <T extends string>(options: T[]): Schema<T> =>
  //@ts-ignore
  (value: unknown) =>
    isOneOf(options, value) ? { data: value } : { errors: 'This field must be a user role' };

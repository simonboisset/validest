import { Schema } from '@ts-v/core';

export const string =
  (error?: string): Schema<string> =>
  (value) =>
    typeof value === 'string' && value.length > 0 ? { data: value } : { errors: error || 'string' };

const isOneOf = <T extends string>(options: T[], value: unknown): value is T =>
  typeof value === 'string' && options.includes(value as T);

export const oneOf =
  <T extends string>(options: T[], error?: string): Schema<T> =>
  //@ts-ignore
  (value: unknown) =>
    isOneOf(options, value) ? { data: value } : { errors: error || 'oneOf' };

import { Schema } from '@ts-v/core';

const isOneOf = <T extends string>(options: T[], value: unknown): value is T =>
  typeof value === 'string' && options.includes(value as T);

const oneOf =
  <T extends string>(options: T[], error?: string): Schema<T> =>
  //@ts-ignore
  (value: unknown) =>
    isOneOf(options, value) ? { data: value } : { errors: error || 'oneOf' };

export default oneOf;

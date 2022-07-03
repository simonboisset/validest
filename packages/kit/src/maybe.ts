import { Schema } from '@ts-v/core';

export const maybe =
  <T>(schema: Schema<T>): Schema<T | undefined> =>
  (value: unknown) => {
    if (value === undefined) {
      return { data: undefined, errors: undefined };
    }
    return schema(value);
  };

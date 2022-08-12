import type { Schema } from '@ts-v/core';

const maybe =
  <T>(schema: Schema<T>): Schema<T | undefined> =>
  (value: unknown) => {
    if (value === undefined) {
      return { data: undefined, errors: undefined };
    }
    return schema(value);
  };
export default maybe;

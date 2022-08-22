import type { Schema } from '@ts-v/core';

const optional =
  <T>(schema: Schema<T>): Schema<T | undefined> =>
  (value: unknown) => {
    if (value === undefined) {
      return { data: undefined, error: undefined };
    }
    return schema(value);
  };
export default optional;

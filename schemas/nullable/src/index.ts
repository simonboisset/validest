import type { Schema } from '@validest/core';

const nullable =
  <T>(schema: Schema<T>): Schema<T | null> =>
  (value: unknown) => {
    if (value === null) {
      return { data: null, error: undefined };
    }
    return schema(value);
  };
export default nullable;

import type { Schema, ValidestError } from '@validest/core';

const array =
  <T>(schema: Schema<T>): Schema<T[]> =>
  //@ts-ignore
  (value) => {
    if (!Array.isArray(value)) {
      return { error: 'array' };
    }
    const data: T[] = [];
    let error: ValidestError<T[]> | undefined = [];

    for (const item of value) {
      const validatedItem = schema(item);
      //@ts-ignore
      error.push(validatedItem.error);
      //@ts-ignore
      data.push(validatedItem.data);
    }
    if (error.every((e) => !e)) {
      error = undefined;
    }
    return { data, error };
  };
export default array;

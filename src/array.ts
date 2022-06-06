import type { Errors, Schema } from './object';

export const array =
  <T>(schema: Schema<T>): Schema<T[]> =>
  //@ts-ignore
  (value) => {
    if (!Array.isArray(value)) {
      return { errors: 'This field must be an array' };
    }
    const data: T[] = [];
    let errors: Errors<T[]> | undefined = [];

    for (const item of value) {
      const validatedItem = schema(item);
      //@ts-ignore
      errors.push(validatedItem.errors);
      //@ts-ignore
      data.push(validatedItem.data);
    }
    if (errors.every((e) => !e)) {
      errors = undefined;
    }
    return { data, errors };
  };

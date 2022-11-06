import type { Schema, ValidestError } from '@validest/core';

type ObjectParam<T> = { [K in keyof T]: Schema<T[K]> };

const object =
  <T extends Record<string, any>>(schema: ObjectParam<T>): Schema<T> =>
  //@ts-ignore
  (value) => {
    let data = {} as T;
    let error = {} as ValidestError<T> | undefined;
    if (error) {
      for (const key in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, key)) {
          const nestedSchema = schema[key];
          //@ts-ignore
          const nestedData = value[key];
          const nestedValidation = nestedSchema(nestedData);
          if (nestedValidation.error) {
            error[key] = nestedValidation.error as any;
          }
          //@ts-ignore
          data[key] = nestedValidation.data;
        }
      }
    }
    if (error && Object.values(error).filter((value) => !!value).length === 0) {
      error = undefined;
    }
    return { data, error };
  };

export default object;

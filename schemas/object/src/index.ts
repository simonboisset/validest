import type { Schema, Errors } from '@ts-v/core';

type ObjectParam<T> = { [K in keyof T]: Schema<T[K]> };

export const object =
  <T extends Record<string, any>>(schema: ObjectParam<T>): Schema<T> =>
  //@ts-ignore
  (value) => {
    let data = {} as T;
    let errors = {} as Errors<T> | undefined;
    if (errors) {
      for (const key in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, key)) {
          const nestedSchema = schema[key];
          //@ts-ignore
          const nestedData = value[key];
          const nestedValidation = nestedSchema(nestedData);
          if (nestedValidation.errors) {
            errors[key] = nestedValidation.errors as any;
          }
          //@ts-ignore
          data[key] = nestedValidation.data;
        }
      }
    }
    if (errors && Object.values(errors).filter((value) => !!value).length === 0) {
      errors = undefined;
    }
    return { data, errors };
  };

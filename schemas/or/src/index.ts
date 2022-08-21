import type { Schema } from '@ts-v/core';

type SchemaValue<S> = S extends Schema<infer A> ? A : never;

const or =
  <T extends Schema<any>>(schemas: T[]): Schema<SchemaValue<T>> =>
  //@ts-ignore
  (value: unknown) => {
    const [schema, ...other] = schemas;
    const { data, errors } = schema(value);
    if (errors && other.length > 0) {
      return or(other)(value);
    }
    return { data, errors };
  };

export default or;

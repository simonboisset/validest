import type { Schema } from '@ts-v/core';

type SchemaValue<S> = S extends Schema<infer A> ? A : never;

const or =
  <S extends Schema<any>>(schemas: S[]): Schema<SchemaValue<S>> =>
  //@ts-ignore
  (value: unknown) => {
    const [schema, ...other] = schemas;
    const { data, error } = schema(value);
    if (error && other.length > 0) {
      return or(other)(value);
    }
    return { data, error };
  };

export default or;

import type { InferSchema, Schema } from '@validest/core';

const or =
  <S extends Schema<any>>(schemas: S[]): Schema<InferSchema<S>> =>
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

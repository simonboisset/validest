import type { Schema } from './types';

export const validate = <T>(params: unknown, schema: Schema<T>) => {
  const { errors, data } = schema(params);
  if (errors) {
    throw errors;
  }
  return data as T;
};

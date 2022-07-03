import { Schema } from './object';

export const isValid = <T>(params: unknown, schema: Schema<T>): params is T => {
  const { errors, data } = schema(params);

  if (errors) {
    return false;
  }
  return true;
};

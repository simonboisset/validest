import { Schema } from './types';

export const isValid = <T>(params: unknown, schema: Schema<T>): params is T => {
  const { errors } = schema(params);

  if (errors) {
    return false;
  }
  return true;
};

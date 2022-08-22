import { Schema } from './types';

export const isValid = <T>(params: unknown, schema: Schema<T>): params is T => {
  const { error } = schema(params);

  if (error) {
    return false;
  }
  return true;
};

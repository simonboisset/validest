import type { Schema } from './types';

export const validate = <T>(params: unknown, schema: Schema<T>) => {
  const { error, data } = schema(params);
  if (error) {
    throw error;
  }
  return data as T;
};

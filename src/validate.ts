import type { Schema } from './object';

export const validate = async <T>(params: unknown, schema: Schema<T>) => {
  const { errors, data } = schema(params);

  if (!data || (errors && Object.values(errors).length)) {
    throw errors;
  }
  return data as T;
};

import { Schema } from './object';

export const isValid = <T>(params: unknown, schema: Schema<T>) => {
  const { errors, data } = schema(params);

  if (!data || (errors && Object.values(errors).length)) {
    return false;
  }
  return true;
};

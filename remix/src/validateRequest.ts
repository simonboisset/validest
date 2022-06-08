import { Schema } from '@ts-v/core';
import get from './get';

export const validateRequest = async <T>(request: Request, schema: Schema<T>) => {
  const formData = await get(request);
  const { errors, data } = schema(formData);

  if (!data || (errors && Object.values(errors).length)) {
    throw errors;
  }
  return data as T;
};

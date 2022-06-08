import { Schema, validate } from '@ts-v/core';
import { getRequestData } from '../data/getRequestData';

export const validateRequest = async <T>(request: Request, schema: Schema<T>) => {
  const formData = await getRequestData(request);

  return validate(formData, schema);
};

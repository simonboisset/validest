import { json } from '@remix-run/node';
import type { Schema } from '@ts-v/core';
import { getRequestData } from '../data/getRequestData';

export const validateRequest = async <T>(request: Request, schema: Schema<T>): Promise<T> => {
  const formData = await getRequestData(request);
  const { data, errors } = schema(formData);
  if (errors) {
    throw json({ errors }, { status: 400 });
  }
  return data as T;
};

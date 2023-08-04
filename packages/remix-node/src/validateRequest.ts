import { json } from '@remix-run/node';
import type { Schema } from '@validest/core';
import { getRequestFormData } from '@validest/form';

export const validateRequest = async <T>(request: Request, schema: Schema<T>): Promise<T> => {
  const formData = await getRequestFormData(request);
  const { data, error } = schema(formData);
  if (error) {
    throw json({ error }, { status: 400 });
  }
  return data as T;
};

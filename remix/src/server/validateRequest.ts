import { Schema, validate } from '@ts-v/core';
import { json } from '@remix-run/node';
import { getRequestData } from '../data/getRequestData';

export const validateRequest = async <T>(request: Request, schema: Schema<T>) => {
  const formData = await getRequestData(request);
  try {
    const data = validate(formData, schema);
    return data;
  } catch (errors) {
    throw json({ errors }, { status: 400 });
  }
};

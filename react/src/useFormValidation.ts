import { Errors, Schema, validate } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from './getFormData';

export const useFormValidation = <T>(
  schema: Schema<T>,
  afterValidate?: (data: T, e: React.FormEvent<HTMLFormElement>) => void
) => {
  const [errors, setErrors] = useState<Errors<T>>();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = validate(getFormData<T>(e.target), schema);
      !!afterValidate && afterValidate(data, e);
    } catch (error: any) {
      setErrors(error);
    }
  };
  return { onSubmit, errors };
};

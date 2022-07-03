import { Errors, Schema } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from './getFormData';

export const useTsvForm = <T>(
  schema: Schema<T>,
  afterValidate?: (data: T, e: React.FormEvent<HTMLFormElement>) => void
) => {
  const [errors, setErrors] = useState<Errors<T>>();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, errors } = schema(getFormData(e.target));
    if (errors) {
      setErrors(errors);
    } else {
      setErrors(undefined);
      if (!!afterValidate) {
        afterValidate(data as T, e);
      }
    }
  };
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { errors } = schema(getFormData(e.target));
    if (errors) {
      setErrors(errors);
    } else {
      setErrors(undefined);
    }
  };
  return { onSubmit, onChange, errors };
};

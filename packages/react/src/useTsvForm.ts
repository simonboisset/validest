import type { TsvError, Schema } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from './getFormData';

export const useTsvForm = <T>(
  schema: Schema<T>,
  afterValidate?: (data: T, e: React.FormEvent<HTMLFormElement>) => void
) => {
  const [error, setError] = useState<TsvError<T>>();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = schema(getFormData(e.target));
    if (error) {
      setError(error);
    } else {
      setError(undefined);
      if (!!afterValidate) {
        afterValidate(data as T, e);
      }
    }
  };
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { error } = schema(getFormData(e.target));
    if (error) {
      setError(error);
    } else {
      setError(undefined);
    }
  };
  return { onSubmit, onChange, error };
};

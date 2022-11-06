import type { Schema, ValidestError } from '@validest/core';
import { getFormData } from '@validest/form';
import { useState } from 'react';

export const useValidestForm = <T>(
  schema: Schema<T>,
  afterValidate?: (data: T, e: React.FormEvent<HTMLFormElement>) => void
) => {
  const [error, setError] = useState<ValidestError<T>>();
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

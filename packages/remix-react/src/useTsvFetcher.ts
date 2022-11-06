import { useFetcher } from '@remix-run/react';
import type { Schema, ValidestError } from '@validest/core';
import { getFormData } from '@validest/form';
import { useState } from 'react';

export const useValidestFetcher = <R, T>(
  schema: Schema<T>
): {
  error: ValidestError<T> | undefined;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.FormEvent<HTMLFormElement>) => void;
  data: R | undefined;
} => {
  const { data: fetcherData, ...fetcher } = useFetcher();
  const [error, setErrors] = useState<ValidestError<T>>();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { error } = schema(getFormData(e.target));
    if (error) {
      e.preventDefault();
      setErrors(error);
    } else {
      setErrors(undefined);
    }
  };
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { error } = schema(getFormData(e.target));
    if (error) {
      setErrors(error);
    } else {
      setErrors(undefined);
    }
  };
  return {
    onSubmit,
    onChange,
    error: error || fetcherData?.error,
    data: fetcherData,
    ...fetcher,
  };
};

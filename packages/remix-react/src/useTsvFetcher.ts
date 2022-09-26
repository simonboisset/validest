import { useFetcher } from '@remix-run/react';
import type { TsvError, Schema } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from '@ts-v/form';

export const useTsvFetcher = <R, T>(schema: Schema<T>) => {
  const { data: fetcherData, ...fetcher } = useFetcher<{ error?: TsvError<T>; data?: R }>();
  const [error, setErrors] = useState<TsvError<T>>();
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
    error: error || (fetcherData?.error as TsvError<T> | undefined),
    data: fetcherData,
    ...fetcher,
  };
};

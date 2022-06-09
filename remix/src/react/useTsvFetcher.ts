import { useFetcher } from '@remix-run/react';
import { Errors, Schema, validate } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from '../data/getFormData';

export const useTsvFetcher = <T>(schema: Schema<T>) => {
  const { data: fetcherData, ...fetcher } = useFetcher();
  const [errors, setErrors] = useState<Errors<T>>();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { errors } = schema(getFormData(e.target));
    if (errors) {
      e.preventDefault();
      setErrors(errors);
    } else {
      setErrors(undefined);
      e.currentTarget.submit();
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
  return {
    onSubmit,
    onChange,
    errors: errors || (fetcherData?.errors as Errors<T> | undefined),
    data: fetcherData?.data,
    ...fetcher,
  };
};

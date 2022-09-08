import { useActionData } from '@remix-run/react';
import type { TsvError, Schema } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from '../data/getFormData';

type ReturnTsvAction<R, T> = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.FormEvent<HTMLFormElement>) => void;
  error: TsvError<T> | undefined;
  data: R;
};

export const useTsvAction = <R, T>(schema: Schema<T>): ReturnTsvAction<R, T> => {
  const actionData = useActionData();
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
    error: error || (actionData?.error as TsvError<T> | undefined),
    data: actionData,
  };
};

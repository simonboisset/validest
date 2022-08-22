import { useActionData } from '@remix-run/react';
import { Errors, Schema } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from '../data/getFormData';

export const useTsvAction = <T>(schema: Schema<T>) => {
  const actionData = useActionData();
  const [error, setErrors] = useState<Errors<T>>();
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
    error: error || (actionData?.error as Errors<T> | undefined),
    data: actionData,
  };
};

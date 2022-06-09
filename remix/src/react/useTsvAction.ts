import { useActionData } from '@remix-run/react';
import { Errors, Schema, validate } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from '../data/getFormData';

export const useTsvAction = <T>(schema: Schema<T>) => {
  const actionData = useActionData();
  const [errors, setErrors] = useState<Errors<T>>();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors } = schema(getFormData(e.target));
    if (errors) {
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
    errors: errors || (actionData?.errors as Errors<T> | undefined),
    data: actionData?.data,
  };
};

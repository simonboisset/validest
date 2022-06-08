import { useActionData } from '@remix-run/react';
import { Errors, Schema, validate } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from '../data/getFormData';

export const useTsvAction = <T>(schema: Schema<T>) => {
  const actionData = useActionData();
  const [errors, setErrors] = useState<Errors<T>>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      validate(getFormData(e.target), schema);
      setErrors(undefined);
      e.currentTarget.submit();
    } catch (error: any) {
      setErrors(error);
    }
  };
  const onChange = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      validate(getFormData(e.target), schema);
      setErrors(undefined);
    } catch (error: any) {
      setErrors(error);
    }
  };
  return { onSubmit, onChange, errors: errors || actionData?.errors, data: actionData?.data };
};

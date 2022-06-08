import { Errors, Schema, validate } from '@ts-v/core';
import { useState } from 'react';
import { getFormData } from './getFormData';

export const useTsvForm = <T>(
  schema: Schema<T>,
  afterValidate?: (data: T, e: React.FormEvent<HTMLFormElement>) => void
) => {
  const [errors, setErrors] = useState<Errors<T>>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = validate(getFormData<T>(e.target), schema);
      if (!!afterValidate) {
        await afterValidate(data, e);
      }
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
  return { onSubmit, onChange, errors };
};

import { useActionData } from '@remix-run/react';
import type { Schema, ValidestError } from '@validest/core';
import { getFormData } from '@validest/form';
import { useState } from 'react';

type ReturnValidestAction<R, T> = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.FormEvent<HTMLFormElement>) => void;
  error: ValidestError<T> | undefined;
  data: R;
};

export const useValidestAction = <R, T>(schema: Schema<T>): ReturnValidestAction<R, T> => {
  const actionData = useActionData();
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
    error: error || (actionData?.error as ValidestError<T> | undefined),
    data: actionData,
  };
};

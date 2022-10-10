import { Schema } from '@ts-v/core';

const any: Schema<any> = (value) => {
  return { data: value as any, error: undefined };
};
export default any;

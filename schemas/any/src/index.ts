import { Schema } from '@validest/core';

const any: Schema<any> = (value) => {
  return { data: value as any, error: undefined };
};
export default any;

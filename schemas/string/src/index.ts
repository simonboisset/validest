import { Schema } from '@ts-v/core';

export const string =
  (error?: string): Schema<string> =>
  (value) =>
    typeof value === 'string' && value.length > 0 ? { data: value } : { errors: error || 'string' };

export default string;

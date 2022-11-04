import { Schema } from '@validest/core';

export const string =
  (error?: string): Schema<string> =>
  (value) =>
    typeof value === 'string' && value.length > 0 ? { data: value } : { error: error || 'string' };

export default string;

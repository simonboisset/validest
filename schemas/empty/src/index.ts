import { Schema } from '@validest/core';

export const empty =
  (error?: string): Schema<undefined> =>
  (value) =>
    !value && value !== 0 && value !== false ? { data: undefined } : { error: error || 'empty', data: undefined };

export default empty;

import { Schema } from '@validest/core';

const json =
  (error?: string): Schema<any> =>
  (value) => {
    if (value === undefined || typeof value !== 'string') {
      return { error: error || 'json' };
    }
    const obj = JSON.parse(value) as any;
    return { data: obj };
  };
export default json;

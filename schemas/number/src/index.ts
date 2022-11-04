import { Schema } from '@validest/core';
import parseNumber from '@validest/parse-number';

const number =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined) {
      return { error: error || 'number' };
    }
    return { data: n };
  };
export default number;

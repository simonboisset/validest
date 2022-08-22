import { Schema } from '@ts-v/core';
import parseNumber from '@ts-v/parse-number';

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

import { Schema } from '@ts-v/core';
import parseNumber from '@ts-v/parse-number';

const int =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined || n < 0 || n !== parseInt(n.toString())) {
      return { errors: error || 'integer' };
    }
    return { data: n };
  };
export default int;

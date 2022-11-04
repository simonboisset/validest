import { Schema } from '@validest/core';
import parseNumber from '@validest/parse-number';

const int =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined || n < 0 || n !== parseInt(n.toString())) {
      return { error: error || 'integer' };
    }
    return { data: n };
  };
export default int;

import { Schema } from '@validest/core';

const date =
  (error?: string): Schema<Date> =>
  (value) => {
    try {
      if (typeof value === 'string' || typeof value === 'number') {
        const dateValue = new Date(value);
        if (dateValue instanceof Date && !isNaN(dateValue.valueOf())) {
          return { data: dateValue };
        }
      } else if (value instanceof Date && !isNaN(value.valueOf())) {
        return { data: value };
      }
      return { error: error || 'date' };
    } catch (err) {
      return { error: error || 'date' };
    }
  };

export default date;

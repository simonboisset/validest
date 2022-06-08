import { array } from './array';
import { date } from './date';
import { maybe } from './maybe';
import { int, number, parseNumber } from './number';
import { object } from './object';
import type { Schema, Errors } from './object';
import { oneOf, string } from './string';
import { validate } from './validate';

const s = { array, date, int, maybe, number, object, string, validate, oneOf };
export type { Schema, Errors };
export { array, date, int, maybe, number, object, string, validate, oneOf, parseNumber };
export default s;

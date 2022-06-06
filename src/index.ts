import { array } from './array';
import { maybe } from './maybe';
import { int, number } from './number';
import { object } from './object';
import type { Schema, Errors } from './object';
import { oneOf, string } from './string';
import { validate } from './validate';

const s = { array, int, maybe, number, object, string, validate, oneOf };
export type { Schema, Errors };
export { array, int, maybe, number, object, string, validate, oneOf };
export default s;

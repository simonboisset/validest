import { expect, test } from 'vitest';
import oneOf from '.';

test('one of test', () => {
  expect(oneOf(['a', 'b', 'c'])('this-is-not-one-of').error).toBe('oneOf');
  expect(oneOf(['a', 'b', 'c'], 'one-of-error')('this-is-not-one-of').error).toBe('one-of-error');
  expect(oneOf(['a', 'b', 'c'])('a').data).toBe('a');
  expect(oneOf(['a', 'b', 'c'])('b').data).toBe('b');
  expect(oneOf(['a', 'b', 'c'])('c').data).toBe('c');
});

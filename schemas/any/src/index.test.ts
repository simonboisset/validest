import { any } from 'validest';
import { expect, test } from 'vitest';

test('any returns value', () => {
  expect(any(undefined).data).toBeUndefined();
  expect(any(undefined).error).toBeUndefined();
  expect(any(null).data).toBeNull();
  expect(any(NaN).data).toBeNaN();
  expect(any(true).data).toBeTruthy();
  expect(any({ key: 1 }).data).toEqual({ key: 1 });
  expect(any([1]).data).toEqual([1]);
});

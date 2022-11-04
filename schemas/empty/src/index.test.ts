import { empty, isValid } from 'validest';
import { expect, test } from 'vitest';

test('empty returns false for non-emptys', () => {
  expect(isValid(undefined, empty())).toBeTruthy();
  expect(isValid(null, empty())).toBeTruthy();
  expect(isValid(NaN, empty())).toBeTruthy();
  expect(isValid('', empty())).toBeTruthy();
});

test('empty returns true for emptys', () => {
  expect(isValid(true, empty())).toBeFalsy();
  expect(isValid(false, empty())).toBeFalsy();
  expect(isValid(0, empty())).toBeFalsy();
  expect(isValid([], empty())).toBeFalsy();
  expect(isValid({}, empty())).toBeFalsy();
  expect(isValid('this is a text', empty())).toBeFalsy();
});

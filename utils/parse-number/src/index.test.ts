import { expect, test } from 'vitest';
import parseNumber from '.';

test('parseNumber returns undefined for non number', () => {
  expect(parseNumber(undefined)).toBeUndefined();
  expect(parseNumber(NaN)).toBeUndefined();
  expect(parseNumber('not-a-number')).toBeUndefined();
  expect(parseNumber('')).toBeUndefined();
  expect(parseNumber([1])).toBeUndefined();
  expect(parseNumber({ a: 1 })).toBeUndefined();
  expect(parseNumber(undefined)).toBeUndefined();
});
test('parseNumber returns number', () => {
  expect(parseNumber('1')).toBe(1);
  expect(parseNumber('1.1')).toBe(1.1);
  expect(parseNumber(1)).toBe(1);
  expect(parseNumber(1.1)).toBe(1.1);
  expect(parseNumber('0')).toBe(0);
  expect(parseNumber('-1')).toBe(-1);
  expect(parseNumber(0)).toBe(0);
});

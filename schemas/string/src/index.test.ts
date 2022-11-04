import { optional, string } from 'validest';
import { expect, test } from 'vitest';

test('string returns false for non-strings', () => {
  expect(string()(undefined).error).toBe('string');
  expect(string()(undefined).data).toBeUndefined();
  expect(string()(null).data).toBeUndefined();
  expect(string()(1).data).toBeUndefined();
  expect(string()(NaN).data).toBeUndefined();
  expect(string()(true).data).toBeUndefined();
  expect(string()({ key: 'this-is-a-key' }).data).toBeUndefined();
  expect(string()(['this-is-a-key']).data).toBeUndefined();
  expect(string()('').data).toBeUndefined();
  expect(string('an-other-error')(undefined).error).toBe('an-other-error');
});

test('string returns true for strings', () => {
  expect(string()('this-is-a-string').data).toBe('this-is-a-string');
  expect(optional(string())('this-is-a-string').error).toBeUndefined();
  expect(string()('1').data).toBe('1');
});

test('string returns false for non-strings', () => {
  expect(optional(string())(null).error).toBe('string');
  expect(optional(string())(null).data).toBeUndefined();
  expect(optional(string())(1).data).toBeUndefined();
  expect(optional(string())(NaN).data).toBeUndefined();
  expect(optional(string())(true).data).toBeUndefined();
  expect(optional(string())({ key: 'this-is-a-key' }).data).toBeUndefined();
  expect(optional(string())(['this-is-a-key']).data).toBeUndefined();
  expect(optional(string())('').data).toBeUndefined();
});

test('string returns true for strings', () => {
  expect(optional(string())('this-is-a-string').data).toBe('this-is-a-string');
  expect(optional(string())('1').data).toBe('1');
  expect(optional(string())(undefined).data).toBeUndefined();
  expect(optional(string())(undefined).error).toBeUndefined();
});

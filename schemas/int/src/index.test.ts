import { int } from 'validest';
import { expect, test } from 'vitest';

test('number returns error for non integer', () => {
  expect(int()(undefined).data).toBeUndefined();
  expect(int()(undefined).error).toBe('integer');
  expect(int('an-other-error')(undefined).error).toBe('an-other-error');
  expect(int()(null).data).toBeUndefined();
  expect(int()(NaN).data).toBeUndefined();
  expect(int()(true).data).toBeUndefined();
  expect(int()({ key: 1 }).data).toBeUndefined();
  expect(int()([1]).data).toBeUndefined();
  expect(int()('').data).toBeUndefined();
  expect(int()('-0.1').data).toBeUndefined();
  expect(int()('-0,1').data).toBeUndefined();
  expect(int()('-1').data).toBeUndefined();
  expect(int()(-1).data).toBeUndefined();
  expect(int()(-1.1).data).toBeUndefined();
  expect(int()('0,1').data).toBeUndefined();
  expect(int()(1.1).data).toBeUndefined();
});

test('number returns data for integer', () => {
  expect(int()(1).data).toBe(1);
  expect(int()('1').data).toBe(1);
  expect(int()(0).data).toBe(0);
  expect(int()('0').data).toBe(0);
});

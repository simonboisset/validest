import number from '.';
import optional from '@ts-v/optional';

test('number returns errors for non-numbers', () => {
  expect(number()(undefined).data).toBeUndefined();
  expect(number()(undefined).errors).toBe('number');
  expect(number('an-other-error')(undefined).errors).toBe('an-other-error');
  expect(number()(null).data).toBeUndefined();
  expect(number()(NaN).data).toBeUndefined();
  expect(number()(true).data).toBeUndefined();
  expect(number()({ key: 1 }).data).toBeUndefined();
  expect(number()([1]).data).toBeUndefined();
  expect(number()('').data).toBeUndefined();
});

test('number returns data for numbers', () => {
  expect(number()(1).data).toBe(1);
  expect(number()(0).data).toBe(0);
  expect(number()('1').data).toBe(1);
  expect(number()('0').data).toBe(0);
  expect(number()('0.1').data).toBe(0.1);
  expect(number()('0,1').data).toBe(0.1);
  expect(number()('-0.1').data).toBe(-0.1);
  expect(number()('-0,1').data).toBe(-0.1);
});

test('optional number returns error for non-numbers', () => {
  expect(optional(number())(null).errors).toBe('number');
  expect(optional(number())(null).data).toBeUndefined();
  expect(optional(number())(NaN).data).toBeUndefined();
  expect(optional(number())(true).data).toBeUndefined();
  expect(optional(number())({ key: 1 }).data).toBeUndefined();
  expect(optional(number())([1]).data).toBeUndefined();
  expect(optional(number())('').data).toBeUndefined();
});

test('optional number returns data for numbers', () => {
  expect(optional(number())(1).data).toBe(1);
  expect(optional(number())(0).data).toBe(0);
  expect(optional(number())('1').data).toBe(1);
  expect(optional(number())('0').data).toBe(0);
  expect(optional(number())('0.1').data).toBe(0.1);
  expect(optional(number())('0,1').data).toBe(0.1);
  expect(optional(number())('-0.1').data).toBe(-0.1);
  expect(optional(number())('-0,1').data).toBe(-0.1);
  expect(optional(number())(undefined).data).toBeUndefined();
  expect(optional(number())(undefined).errors).toBeUndefined();
});
import number from '.';
import maybe from '@ts-v/maybe';

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

test('maybe number returns error for non-numbers', () => {
  expect(maybe(number())(null).errors).toBe('number');
  expect(maybe(number())(null).data).toBeUndefined();
  expect(maybe(number())(NaN).data).toBeUndefined();
  expect(maybe(number())(true).data).toBeUndefined();
  expect(maybe(number())({ key: 1 }).data).toBeUndefined();
  expect(maybe(number())([1]).data).toBeUndefined();
  expect(maybe(number())('').data).toBeUndefined();
});

test('maybe number returns data for numbers', () => {
  expect(maybe(number())(1).data).toBe(1);
  expect(maybe(number())(0).data).toBe(0);
  expect(maybe(number())('1').data).toBe(1);
  expect(maybe(number())('0').data).toBe(0);
  expect(maybe(number())('0.1').data).toBe(0.1);
  expect(maybe(number())('0,1').data).toBe(0.1);
  expect(maybe(number())('-0.1').data).toBe(-0.1);
  expect(maybe(number())('-0,1').data).toBe(-0.1);
  expect(maybe(number())(undefined).data).toBeUndefined();
  expect(maybe(number())(undefined).errors).toBeUndefined();
});

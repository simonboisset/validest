import { number, object, string } from 'validest';
import { expect, test } from 'vitest';

test('email returns data object', () => {
  const obj = { name: 'Simon', age: '25', password: 'foo' };

  const { error, data } = object({ name: string(), age: number(), password: string() })(obj);

  expect(data?.name).toBe('Simon');
  expect(data?.age).toBe(25);
  expect(data?.password).toBe('foo');
  expect(error).toBeUndefined();
});
test('email returns data nested object', () => {
  const obj = { profile: { name: 'Simon', age: '25' }, password: 'foo', id: '1234' };

  const { error, data } = object({
    profile: object({ name: string(), age: number() }),
    id: number(),
    password: string(),
  })(obj);

  expect(data?.profile.name).toBe('Simon');
  expect(data?.profile.age).toBe(25);
  expect(data?.password).toBe('foo');
  expect(data?.id).toBe(1234);
  expect(error).toBeUndefined();
});
test('email returns nested error', () => {
  const obj = { profile: { name: 'Simon', age: 'not-a-number' }, password: 'foo', id: '1234' };

  const { error, data } = object({
    profile: object({ name: string(), age: number() }),
    id: number(),
    password: string(),
  })(obj);

  expect(data?.profile.name).toBe('Simon');
  expect(data?.profile.age).toBeUndefined();
  expect(error?.profile?.age).toBe('number');
  expect(data?.password).toBe('foo');
  expect(data?.id).toBe(1234);
  expect(error?.password).toBeUndefined();
});

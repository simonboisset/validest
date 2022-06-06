import { number } from './number';
import { object } from './object';
import { string } from './string';

test('email returns data object', () => {
  const obj = { name: 'Simon', age: '25', password: 'foo' };

  const { errors, data } = object({ name: string(), age: number(), password: string() })(obj);

  expect(data?.name).toBe('Simon');
  expect(data?.age).toBe(25);
  expect(data?.password).toBe('foo');
  expect(errors).toBeUndefined();
});
test('email returns data nested object', () => {
  const obj = { profile: { name: 'Simon', age: '25' }, password: 'foo', id: '1234' };

  const { errors, data } = object({
    profile: object({ name: string(), age: number() }),
    id: number(),
    password: string(),
  })(obj);

  expect(data?.profile.name).toBe('Simon');
  expect(data?.profile.age).toBe(25);
  expect(data?.password).toBe('foo');
  expect(data?.id).toBe(1234);
  expect(errors).toBeUndefined();
});
test('email returns nested errors', () => {
  const obj = { profile: { name: 'Simon', age: 'not-a-number' }, password: 'foo', id: '1234' };

  const { errors, data } = object({
    profile: object({ name: string(), age: number() }),
    id: number(),
    password: string(),
  })(obj);

  expect(data?.profile.name).toBe('Simon');
  expect(data?.profile.age).toBeUndefined();
  expect(errors?.profile?.age).toBe('number');
  expect(data?.password).toBe('foo');
  expect(data?.id).toBe(1234);
  expect(errors?.password).toBeUndefined();
});

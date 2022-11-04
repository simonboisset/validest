import { array, date, int, isValid, number, object, oneOf, string } from 'validest';
import { expect, test } from 'vitest';

test('shoud validate form data', () => {
  const params = {
    name: 'joe',
    age: '25',
    password: 'foo',
  };
  const result = isValid(params, object({ name: string(), age: number(), password: string() }));
  expect(result).toBeTruthy();
});
test('shoud validate string', () => {
  const result = isValid('hello', string());
  expect(result).toBeTruthy();
});
test('shoud validate number', () => {
  const result = isValid('2', number());
  expect(result).toBeTruthy();
});
test('shoud validate integer', () => {
  const result = isValid('2', int());
  expect(result).toBeTruthy();
});
test('shoud validate date', () => {
  const dateValue = new Date('2022-01-12');
  const result = isValid('2022-01-12', date());
  expect(result).toBeTruthy();
});
test('shoud get form data with deep nested object', () => {
  const params = {
    name: 'joe',
    profile: {
      name: { firstname: 'john', lastname: 'doe' },
      role: 'ADMIN',
      age: '25',
    },
  };

  const result = isValid(
    params,
    object({
      name: string(),
      profile: object({
        name: object({ firstname: string(), lastname: string() }),
        role: string(),
        age: number(),
      }),
    })
  );

  expect(result).toBeTruthy();
});
test('shoud validate form data with nested array', () => {
  const params = {
    name: 'joe',
    list: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  };

  const result = isValid(
    params,
    object({
      name: string(),
      list: array(string()),
    })
  );
  expect(result).toBeTruthy();
});
test('shoud get form data with deep nested array', () => {
  const params = {
    name: 'joe',
    list: [
      { name: 'Item 1', id: '1' },
      { name: 'Item 2', id: '2' },
      { name: 'Item 3', id: '3' },
      { name: 'Item 4', id: '4' },
      { name: 'Item 5', id: '5' },
    ],
  };

  const result = isValid(params, object({ name: string(), list: array(object({ name: string(), id: number() })) }));
  expect(result).toBeTruthy();
});
test('shoud get form data with deep flat array', () => {
  const params = [
    { name: 'Item 1', id: '1' },
    { name: 'Item 2', id: '2' },
    { name: 'Item 3', id: '3' },
    { name: 'Item 4', id: '4' },
    { name: 'Item 5', id: '5' },
  ];

  const result = isValid(params, array(object({ name: string(), id: number() })));

  expect(result).toBeTruthy();
});
test('shoud throw error for an array', async () => {
  const params = [
    { name: 'Item 1', id: 'a' },
    { name: 'Item 2', id: 2 },
    { name: 'Item 3', id: 'b' },
    { name: 'Item 4', id: 'c' },
    { name: 'Item 5', id: 'd' },
  ];

  const result = isValid(params, array(object({ name: string(), id: string('id-error') })));
  expect(result).toBeFalsy();
});
test('shoud throw error for an object', async () => {
  const params = {
    name: 'joe',
    profile: {
      name: { firstname: 'john', lastname: null },
      roles: ['ADMIN', 'AN_OTHER_ROLE', 'MANAGER'],
      age: '25',
    },
  };

  const result = isValid(
    params,
    object({
      name: string(),
      profile: object({
        name: object({ firstname: string(), lastname: string('lastname-error') }),
        roles: array(oneOf(['ADMIN', 'MANAGER'], 'role-error')),
        age: number(),
      }),
    })
  );
  expect(result).toBeFalsy();
});
test('shoud return array error', async () => {
  const params = {
    name: 'joe',
    list: { notAnArray: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'] },
  };

  const result = isValid(
    params,
    object({
      name: string(),
      list: array(string()),
    })
  );
  expect(result).toBeFalsy();
});

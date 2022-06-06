import { array } from './array';
import { number } from './number';
import { object } from './object';
import { string } from './string';
import { validate } from './validate';

test('shoud validate form data', async () => {
  const params = {
    name: 'joe',
    age: '25',
    password: 'foo',
  };
  const result = await validate(params, object({ name: string, age: number, password: string }));

  expect(result.name).toBe('joe');
  expect(result.age).toBe(25);
  expect(result.password).toBe('foo');
});
test('shoud get form data with deep nested object', async () => {
  const params = {
    name: 'joe',
    profile: {
      name: { firstname: 'john', lastname: 'doe' },
      role: 'ADMIN',
      age: '25',
    },
  };

  const result = await validate(
    params,
    object({
      name: string,
      profile: object({
        name: object({ firstname: string, lastname: string }),
        role: string,
        age: number,
      }),
    })
  );

  expect(result.name).toBe('joe');
  expect(result.profile.name.firstname).toBe('john');
  expect(result.profile.name.lastname).toBe('doe');
  expect(result.profile.role).toBe('ADMIN');
  expect(result.profile.age).toBe(25);
});
test('shoud validate form data with nested array', async () => {
  const params = {
    name: 'joe',
    list: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  };

  const result = await validate(
    params,
    object({
      name: string,
      list: array(string),
    })
  );
  expect(result.name).toBe('joe');
  expect(Array.isArray(result.list)).toBeTruthy();
  expect(result.list[0]).toBe('Item 1');
  expect(result.list[1]).toBe('Item 2');
  expect(result.list[2]).toBe('Item 3');
  expect(result.list[3]).toBe('Item 4');
  expect(result.list[4]).toBe('Item 5');
});
test('shoud get form data with deep nested array', async () => {
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

  const result = await validate(params, object({ name: string, list: array(object({ name: string, id: number })) }));
  expect(result.name).toBe('joe');
  expect(Array.isArray(result.list)).toBeTruthy();
  expect(result.list[0].name).toBe('Item 1');
  expect(result.list[0].id).toBe(1);
  expect(result.list[1].name).toBe('Item 2');
  expect(result.list[1].id).toBe(2);
});
test('shoud get form data with deep flat array', async () => {
  const params = [
    { name: 'Item 1', id: '1' },
    { name: 'Item 2', id: '2' },
    { name: 'Item 3', id: '3' },
    { name: 'Item 4', id: '4' },
    { name: 'Item 5', id: '5' },
  ];

  const result = await validate(params, array(object({ name: string, id: number })));

  expect(Array.isArray(result)).toBeTruthy();
  expect(result[0].name).toBe('Item 1');
  expect(result[0].id).toBe(1);
  expect(result[1].name).toBe('Item 2');
  expect(result[1].id).toBe(2);
});

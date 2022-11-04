import { and, int, object, string } from 'validest';
import { expect, test } from 'vitest';

test('number and int', () => {
  const schema = and([int(), string()]);
  expect(schema(undefined).data).toBeUndefined();
  expect(schema(1).data).toBeUndefined();
  expect(schema('1').data).toBeUndefined();
  expect(schema('a string').data).toBeUndefined();
});
test('object intersection', () => {
  const schema = and([
    object({
      name: string(),
      age: int(),
    }),
    object({
      firstname: string(),
      lastname: string(),
    }),
  ]);
  expect(schema({}).data).toEqual({ age: undefined, firstname: undefined, lastname: undefined, name: undefined });
  expect(schema({ notAKey: '', age: 21, name: 'a name' }).data).toEqual({
    age: 21,
    name: 'a name',
    firstname: undefined,
    lastname: undefined,
  });
  expect(schema({ age: 21, name: 'a name' }).data).toEqual({
    age: 21,
    name: 'a name',
    firstname: undefined,
    lastname: undefined,
  });
  expect(schema({ age: 21, firstname: 'a firstname' }).error).toEqual({
    lastname: 'string',
    name: 'string',
  });
  expect(schema({ age: 21, firstname: 'a firstname' }).data).toEqual({
    age: 21,
    firstname: 'a firstname',
    lastname: undefined,
  });
  expect(schema({ age: 21, name: 'a name', firstname: 'a firstname', lastname: 'a lastname' }).data).toEqual({
    age: 21,
    firstname: 'a firstname',
    lastname: 'a lastname',
    name: 'a name',
  });
  expect(schema({ age: 21, name: 'a name', firstname: 'a firstname', lastname: 'a lastname' }).error).toBeUndefined();
});

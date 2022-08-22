import or from '.';
import string from '@ts-v/string';
import int from '@ts-v/int';
import object from '@ts-v/object';

test('number or int', () => {
  const schema = or([string(), int()]);
  expect(schema(undefined).data).toBeUndefined();
  expect(schema(1).data).toBe(1);
  expect(schema('1').data).toBe('1');
  expect(schema('a string').data).toBe('a string');
});
test('object union', () => {
  const schema = or([
    object({
      name: string(),
      age: int(),
    }),
    object({
      firstname: string(),
      lastname: string(),
      age: int(),
    }),
  ]);
  expect(schema({}).data).toEqual({ age: undefined, firstname: undefined, lastname: undefined });
  expect(schema({ notAKey: '', age: 21, name: 'a name' }).data).toEqual({
    age: 21,
    name: 'a name',
  });
  expect(schema({ age: 21, name: 'a name' }).data).toEqual({ age: 21, name: 'a name' });
  expect(schema({ age: 21, firstname: 'a firstname' }).error).toEqual({
    lastname: 'string',
  });
  expect(schema({ age: 21, firstname: 'a firstname' }).data).toEqual({
    age: 21,
    firstname: 'a firstname',
    lastname: undefined,
  });
  expect(schema({ age: 21, firstname: 'a firstname', lastname: 'a lastname' }).data).toEqual({
    age: 21,
    firstname: 'a firstname',
    lastname: 'a lastname',
  });
});

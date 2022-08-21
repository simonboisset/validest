import or from '.';
import string from '@ts-v/string';
import int from '@ts-v/int';
import object from '@ts-v/object';

test('number or int', () => {
  const shema = or([string(), int()]);
  expect(shema(undefined).data).toBeUndefined();
  expect(shema(1).data).toBe(1);
  expect(shema('1').data).toBe('1');
  expect(shema('a string').data).toBe('a string');
});
test('object union', () => {
  const shema = or([
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
  expect(shema({}).data).toEqual({ age: undefined, firstname: undefined, lastname: undefined });
  expect(shema({ notAKey: '', age: 21, name: 'a name' }).data).toEqual({
    age: 21,
    name: 'a name',
  });
  expect(shema({ age: 21, name: 'a name' }).data).toEqual({ age: 21, name: 'a name' });
  expect(shema({ age: 21, firstname: 'a firstname' }).errors).toEqual({
    lastname: 'string',
  });
  expect(shema({ age: 21, firstname: 'a firstname' }).data).toEqual({
    age: 21,
    firstname: 'a firstname',
    lastname: undefined,
  });
  expect(shema({ age: 21, firstname: 'a firstname', lastname: 'a lastname' }).data).toEqual({
    age: 21,
    firstname: 'a firstname',
    lastname: 'a lastname',
  });
});

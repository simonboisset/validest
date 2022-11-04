import { json } from 'validest';
import { expect, test } from 'vitest';

test('json returns error for non json value', () => {
  expect(json()(undefined).data).toBeUndefined();
  expect(json()(undefined).error).toBe('json');
  expect(json('an-other-error')(undefined).error).toBe('an-other-error');
  expect(json()(null).data).toBeUndefined();
  expect(json()(NaN).data).toBeUndefined();
  expect(json()(true).data).toBeUndefined();
  expect(json()({ key: 1 }).data).toBeUndefined();
  expect(json()([1]).data).toBeUndefined();
});

test('json returns data for jsons', () => {
  const value = {
    key: 1,
    value: 'this is a value',
    options: ['option 1', 'option 2', 'option 3'],
    createdAt: new Date('2022-01-12'),
  };

  const jsonValue = JSON.stringify(value);
  const parsedValue = JSON.parse(jsonValue);
  expect(json()(jsonValue).data).toEqual(parsedValue);
});

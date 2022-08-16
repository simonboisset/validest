import array from '.';
import string from '@ts-v/string';

test('shoud return array error', () => {
  const params = {
    name: 'joe',
    list: { notAnArray: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'] },
  };
  const { errors } = array(string())(params);
  expect(errors).toBe('array');
});

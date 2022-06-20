import { array, object, Schema } from '@ts-v/core';
import { validateRequest } from './validateRequest';

export const string =
  (error?: string): Schema<string> =>
  (value) =>
    typeof value === 'string' && value.length > 0 ? { data: value } : { errors: error || 'string' };

export const parseNumber = (value: unknown) => {
  const n = typeof value === 'string' ? (!value ? undefined : Number(value.replace(',', '.'))) : value;
  if (typeof n !== 'number' || (n !== 0 && !n)) {
    return undefined;
  }
  return n;
};

const isOneOf = <T extends string>(options: T[], value: unknown): value is T =>
  typeof value === 'string' && options.includes(value as T);

export const oneOf =
  <T extends string>(options: T[], error?: string): Schema<T> =>
  //@ts-ignore
  (value: unknown) =>
    isOneOf(options, value) ? { data: value } : { errors: error || 'oneOf' };

export const date =
  (error?: string): Schema<Date> =>
  (value) => {
    try {
      if (typeof value === 'string' || typeof value === 'number') {
        const dateValue = new Date(value);
        if (dateValue instanceof Date && !isNaN(dateValue.valueOf())) {
          return { data: dateValue };
        }
      } else if (value instanceof Date && !isNaN(value.valueOf())) {
        return { data: value };
      }
      return { errors: error || 'date' };
    } catch (err) {
      return { errors: error || 'date' };
    }
  };

export const number =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined) {
      return { errors: error || 'number' };
    }
    return { data: n };
  };

export const int =
  (error?: string): Schema<number> =>
  (value) => {
    const n = parseNumber(value);

    if (n === undefined || n < 0 || n !== parseInt(n.toString())) {
      return { errors: error || 'integer' };
    }
    return { data: n };
  };

test('shoud validate form data', async () => {
  const map = new Map([
    ['name', 'simon'],
    ['age', '25'],
    ['password', 'foo'],
  ]);
  const request = { formData: () => map } as unknown as Request;
  const result = await validateRequest(request, object({ name: string(), age: number(), password: string() }));

  expect(result.name).toBe('simon');
  expect(result.age).toBe(25);
  expect(result.password).toBe('foo');
});
test('shoud get form data with deep nested object', async () => {
  const map = new Map([
    ['name', 'joe'],
    ['profile-name-firstname', 'john'],
    ['profile-name-lastname', 'doe'],
    ['profile-role', 'SERVER'],
    ['profile-age', '25'],
  ]);
  const request = { formData: () => map } as unknown as Request;
  const result = await validateRequest(
    request,
    object({
      name: string(),
      profile: object({
        name: object({ firstname: string(), lastname: string() }),
        role: string(),
        age: number(),
      }),
    })
  );

  expect(result.name).toBe('joe');
  expect(result.profile.name.firstname).toBe('john');
  expect(result.profile.name.lastname).toBe('doe');
  expect(result.profile.role).toBe('SERVER');
  expect(result.profile.age).toBe(25);
});
test('shoud validate form data with nested array', async () => {
  const map = new Map([
    ['name', 'simon'],
    ['tables-0', 'Table 1'],
    ['tables-1', 'Table 2'],
    ['tables-2', 'Table 3'],
    ['tables-3', 'Table 4'],
    ['tables-4', 'Table 5'],
  ]);
  const request = { formData: () => map } as unknown as Request;
  const result = await validateRequest(
    request,
    object({
      name: string(),
      tables: array(string()),
    })
  );
  expect(result.name).toBe('simon');
  expect(Array.isArray(result.tables)).toBeTruthy();
  expect(result.tables[0]).toBe('Table 1');
  expect(result.tables[1]).toBe('Table 2');
  expect(result.tables[2]).toBe('Table 3');
  expect(result.tables[3]).toBe('Table 4');
  expect(result.tables[4]).toBe('Table 5');
});
test('shoud get form data with deep nested array', async () => {
  const map = new Map([
    ['name', 'simon'],
    ['tables-0-name', 'Table 1'],
    ['tables-0-id', '1'],
    ['tables-1-name', 'Table 2'],
    ['tables-1-id', '2'],
    ['tables-2-name', 'Table 3'],
    ['tables-2-id', '3'],
    ['tables-3-name', 'Table 4'],
    ['tables-3-id', '4'],
  ]);
  const request = { formData: () => map } as unknown as Request;
  const result = await validateRequest(
    request,
    object({ name: string(), tables: array(object({ name: string(), id: number() })) })
  );
  expect(result.name).toBe('simon');
  expect(Array.isArray(result.tables)).toBeTruthy();
  expect(result.tables[0].name).toBe('Table 1');
  expect(result.tables[0].id).toBe(1);
  expect(result.tables[1].name).toBe('Table 2');
  expect(result.tables[1].id).toBe(2);
});
test('shoud get form data with deep flat array', async () => {
  const map = new Map([
    ['0-name', 'Table 1'],
    ['0-id', '1'],
    ['1-name', 'Table 2'],
    ['1-id', '2'],
    ['2-name', 'Table 3'],
    ['2-id', '3'],
    ['3-name', 'Table 4'],
    ['3-id', '4'],
  ]);
  const request = { formData: () => map } as unknown as Request;
  const result = await validateRequest(request, array(object({ name: string(), id: number() })));

  expect(Array.isArray(result)).toBeTruthy();
  expect(result[0].name).toBe('Table 1');
  expect(result[0].id).toBe(1);
  expect(result[1].name).toBe('Table 2');
  expect(result[1].id).toBe(2);
});

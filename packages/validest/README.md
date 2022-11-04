# Typescript validation starter kit

See [validest documentation](https://validest.dev)
Validation schema for typescript.

## Quick start

Installation :

```sh
yarn add @validest/core validest
```

Code :

```ts
import { array, object, validate } from '@validest/core';
import { number, oneOf, string } from 'validest';

// Unknown params
const params = {
  name: 'joe',
  profile: {
    name: { firstname: 'john', lastname: 'doe' },
    role: 'ADMIN',
    age: '25',
  },
};

const { name, profile } = validate(
  params,
  object({
    name: string(),
    profile: object({
      name: object({ firstname: string(), lastname: string() }),
      role: string(),
      age: number(),
    }),
  })

  profile.age = 25
);
```

The returned value of validate function will be typed.

## Type schema

Here is the core typed schemas. Each schema is un function wich return a object with data or error.

### string

Value will be string with length > 0

```ts
const name = validate('hello', string());
```

### oneOf

Parameter takes array of string in parameter ans value will be typed with element of this array.

```ts
const role = validate('ADMIN', oneOf(['ADMIN', 'MANAGER'] as Role[]));
```

### number

Value will be a number.

```ts
const height = validate('150.5', number());
height = 150.5;
```

### int

Value will be an integer (number type).

```ts
const age = validate('25', int());
age = 25;
```

### maybe

Parameter takes another schema to defined the type. Value will be type of the nested schema or undefined.

```ts
const age = validate(undefined, maybe(int()));
age = undefined;
```

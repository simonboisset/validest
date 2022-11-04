---
sidebar_position: 2
tags: [data validation, schema, typescript]
---

# Core concepts

`@validest/core` contains the core concepts of validest.

It includes a `Schema` type, a `ValidationError` type and 2 functions `validate` and `isValid`.

## Installation

```sh
yarn add @validest/core
```

## validate

The `validate` function take an unknown data and schema then return the data with the ReturnType of the schame or throw a `ValidationError`.

```ts
import { validate } from '@validest/core';

// Unknown data
const data = {
  name: 'joe',
  profile: {
    name: { firstname: 'john', lastname: 'doe' },
    role: 'ADMIN',
    age: '25',
  },
};

try {
  const { name, profile } = validate(
    data,
    object({
      name: string(),
      profile: object({
        name: object({ firstname: string('My firstname error'), lastname: string() }),
        role: string(),
        age: number(),
      }),
    })
  );

  profile.age = 25;
} catch (error) {
  error.profile.name.firstname = 'My firstname error';
}
```

## isValid

Same as validate parameters but return true if is valid or false if is not.
The data will be also typed.

```ts
if (isValid(data, schema)) {
  data.profile.name.firstname;
}
```

## Types

### Schema

```ts
import type { Schema } from '@validest/core';
```

It's useful if you want to write your own schema. The only rule is tu return a Schema type with you desired type in generic type.

Schema type is a function that take an unkown value and return an object `{ data , error }`. If value is good error must undefined, if it's not data must be undefined.

Example for a password :

```ts
export const password =
  (error?: string): Schema<string> =>
  (value) => {
    return typeof value === 'string' && value.length > 8 ? { data: value } : { error: error || 'password' };
  };
```

### ValidationError

If params don't pass validation it will throw error as a similar object with keys params and string error values.

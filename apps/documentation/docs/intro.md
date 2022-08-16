---
sidebar_position: 1
---

# Intro

ts-v is a data runtime validation tool, written in typescript and for typescript. It is a lightweight alternative to [yup](https://github.com/jquense/yup), [zod](https://zod.dev/) or [superstruct](https://docs.superstructjs.org/).

ts-v is written with customization in mind. Of course there is a standard validation scheme, but sometimes you may need specific data validation and you can do that with ts-v.

## Installation

```sh
yarn add @ts-v/core
```

:::info
You can install `@ts-v/kit` instead of `@ts-v/core` to use all schemas.
:::

Install the schema you need :

```sh
yarn add @ts-v/object @ts-v/string @ts-v/int
```

## Usage

### Write your schema

```ts
import string from '@ts-v/string';
import object from '@ts-v/object';
import int from '@ts-v/int';

const schema = object({
  name: string('Custom error message'),
  age: int(),
});
```

### Validate your data

```ts
try {
  const { name, age } = validate(data,schema)

} catch (error) {
  error = {
    name: 'Custom error message'
    age: 'number',
  };
}
```

### Test your data conditionally

```ts
if (isValid(data, schema)) {
  data.name;
}
```

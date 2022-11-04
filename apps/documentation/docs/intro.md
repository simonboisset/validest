---
sidebar_position: 1
---

# Intro

validest is a data runtime validation tool, written in typescript and for typescript. It is a lightweight alternative to [yup](https://github.com/jquense/yup), [zod](https://zod.dev/) or [superstruct](https://docs.superstructjs.org/).

validest is written with customization in mind. Of course there is a standard validation scheme, but sometimes you may need specific data validation and you can do that with validest.

## Installation

```sh
yarn add @validest/core
```

:::info
You can install `validest` instead of `@validest/core` to use all schemas.
:::

Install the schema you need :

```sh
yarn add @validest/object @validest/string @validest/int
```

## Usage

### Write your schema

```ts
import string from '@validest/string';
import object from '@validest/object';
import int from '@validest/int';

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

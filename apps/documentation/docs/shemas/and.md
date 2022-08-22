---
sidebar_position: 1
---

# And

Take an array of nested schemas and is success if data is an intersection type of these schemas.

# Usage

```ts
const data = {
  age: 25,
  firstname: 'John',
  lastname: 'Doe',
};

const schema = and([
  object({
    age: int(),
  }),
  object({
    firstname: string(),
    lastname: string(),
  }),
]);

const typedData: {
  age: number;
} & {
  firstname: string;
  lastname: string;
} = validate(data, schema);
```

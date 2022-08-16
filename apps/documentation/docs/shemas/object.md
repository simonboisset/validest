---
sidebar_position: 7
---

# Object

Take an object of nested schema values and validate it if data is an object with same keys and type values.

# Usage

```ts
const data = {
  name: 'John',
  age: 25,
};

const schema = object({ name: string('Custom string error'), age: number('Custom number error') });
const typedData: { name: string; age: number } = validate(data, schema);
```

---
sidebar_position: 9
---

# Optional

Take a nested schema and is success if data is a type of nested schema or `undefined`.

# Usage

```ts
const data = undefined;

const schema = optional(number('Custom error'));
const typedData: number | undefined = validate(data, schema);
```

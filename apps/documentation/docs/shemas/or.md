---
sidebar_position: 10
---

# Or

Take an array of nested schemas and is success if data is a union type of these schemas.

# Usage

```ts
const data = 1;
const schema = or([string(), int()]);
const typedData: number | undefined = validate(data, schema);
```

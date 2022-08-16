---
sidebar_position: 5
---

# Nullable

Take a nested schema and is success if data is a type of nested schema or `null`.

# Usage

```ts
const data = null;

const schema = nullable(number('Custom error'));
const typedData: number | null = validate(data, schema);
```

---
sidebar_position: 2
---

# Array

Take a nested schema and validate it if data is an array.

# Usage

```ts
const data = [1, 2, 3];

const schema = array(number('Custom number error'));
const typedData: number[] = validate(data, schema);
```

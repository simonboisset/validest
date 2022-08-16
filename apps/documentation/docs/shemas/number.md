---
sidebar_position: 6
---

# Number

Success if data is a number.

# Usage

```ts
const data = 1.2;

const schema = number('Custom error');
const typedData: number = validate(data, schema);
```

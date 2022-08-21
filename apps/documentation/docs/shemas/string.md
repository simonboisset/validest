---
sidebar_position: 11
---

# String

Success if data is a string.

# Usage

```ts
const data = 'this is a string';

const schema = string('Custom error');
const typedData: string = validate(data, schema);
```

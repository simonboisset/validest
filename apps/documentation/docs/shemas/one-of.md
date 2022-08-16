---
sidebar_position: 8
---

# One of

Success if data is one of value of parameters.

# Usage

```ts
const data = 1;

const schema = oneOf(['ADMIN', 'MANAGER'], 'Custom error');
const typedData = validate(data, schema);
```

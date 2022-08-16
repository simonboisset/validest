---
slug: typed-and-validated
title: Typed and validated
authors: simon
tags: [data validation, schema, yup, typescript]
---

## A new way for data validation and typescript

Hi! Today I am introducing my new package for data validation and type safety.

:::caution
It's still a work in progress
:::

`ts-v` try to make data validation ans type checking easier.

To be short ts-v is :

### Lightweight

With ts-v I focused on the validation proccess and generic types but `@ts-v/core` does not include any schema. To make your data validation working with this library you need to add schema package or write your own. That's why `@ts-v/core` is < 1kb comparate to [yup](https://github.com/jquense/yup) ~ 20kb.

### Customizable

For same reasons ts-v is designed to be easy to customize by writing your own schema and use it with core validation.

### Framework tools

Intrinsically ts-v is framework agnostic but I have in mind to add opinionated tools for some frameworks.

For example `@ts-v/react` give you some hooks for form validation using `@ts-v/core` validation system.

## You can test it

If you are interested in this library let's go to read his [documentation](/docs/intro) and test it.
If you found some issues do not hesitate for giving me feedback on [github](https://github.com/simonboisset/ts-v).

Thanks

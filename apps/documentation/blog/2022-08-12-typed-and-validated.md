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

`validest` try to make data validation ans type checking easier.

To be short validest is :

### Lightweight

With validest I focused on the validation proccess and generic types but `@validest/core` does not include any schema. To make your data validation working with this library you need to add schema package or write your own. That's why `@validest/core` is < 1kb comparate to [yup](https://github.com/jquense/yup) ~ 20kb.

### Customizable

For same reasons validest is designed to be easy to customize by writing your own schema and use it with core validation.

### Framework tools

Intrinsically validest is framework agnostic but I have in mind to add opinionated tools for some frameworks.

For example `@validest/react` give you some hooks for form validation using `@validest/core` validation system.

## You can test it

If you are interested in this library let's go to read his [documentation](/docs/intro) and test it.
If you found some issues do not hesitate for giving me feedback on [github](https://github.com/simonboisset/validest).

Thanks

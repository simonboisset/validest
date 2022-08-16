---
sidebar_position: 2
tags: [form validation, remix]
---

# Remix

Data validation for `remix`

## Conventions

This package uses the same conventions [here](/docs/frameworks/react#conventions)

## Installation

```sh
yarn add @ts-v/remix
```

## Front validation

### useTsvAction

It's written on top of `useActionData`.

```tsx
import { useTsvAction }from '@ts-v/remix/react';

const schema = object({
  name:object({ lastname: string('Please enter your lastname'), firstname: string('Please enter your firstname') }),
  age: number('Please enter a number for your age'),
  contacts: array(object({ userId: string('Your contact must be defined'), text: maybe(string()) }));
})

const Component =()=>{
  // To valide form on each changes you can use onChange methode
  const { errors, onChange } = useTsvAction(schema)
  return (
    <Form onChange={onChange}>
      <input name='name-lastname'/>
      {errors?.name?.lastname && <div>{errors.name.lastname}<div>}
      <input name='name-firstname'/>
      <input name='age'/>
      {errors?.age && <div>{errors.age}<div>}
      <input name='contacts-0-userId'/>
      <input name='contacts-0-text'/>
      <input name='contacts-1-userId'/>
      <input name='contacts-1-text'/>
      {errors?.contacts?.[1]?.text && <div>{errors.contacts.[1].text}<div>}
      <button type='submit'>Submit</button>
    </Form>
  )
}
```

### useTsvFetcher

It's written on top of `useFetcher`.

```tsx
import { useTsvFetcher }from '@ts-v/remix/react';

const schema = object({
  name:object({ lastname: string('Please enter your lastname'), firstname: string('Please enter your firstname') }),
  age: number('Please enter a number for your age'),
  contacts: array(object({ userId: string('Your contact must be defined'), text: maybe(string()) }));
})

const Component =()=>{
  const { errors, onSubmit,Form } = useTsvFetcher(schema,(data,e) =>{
  // make that you want after validation
})
return (
  <Form action='api/request' onSubmit={onSubmit}>
    <input name='name-lastname'/>
    {errors?.name?.lastname && <div>{errors.name.lastname}<div>}
    <input name='name-firstname'/>
    <input name='age'/>
    {errors?.age && <div>{errors.age}<div>}
    <input name='contacts-0-userId'/>
    <input name='contacts-0-text'/>
    <input name='contacts-1-userId'/>
    <input name='contacts-1-text'/>
    {errors?.contacts?.[1]?.text && <div>{errors.contacts.[1].text}<div>}
    <button type='submit'>Submit</button>
  </Form>
)}
```

## Back validation

In ActionFunction you can validate the data of the request with same schema and it will be typed.

```ts
import { validateRequest } from '@ts-v/remix/node';

export const action: ActionFunction = ({ request }) => {
  const data = validateRequest(request, schema);
  // your data is validated and typed
};
```
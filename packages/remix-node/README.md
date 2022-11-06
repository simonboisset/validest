# Typescript validation for remix action

See [validest documentation](https://validest.dev)
Validation schema for typescript.

## Concept

For schema types and front validation please read the docs of linked packages :

- [core](../core#readme)
- [react](../react#readme)

## Installation

```sh
yarn add @validest/remix
```

## Front validation

### useValidestAction

```tsx
import { useValidestAction }from '@validest/remix';

const schema = object({
  name:object({ lastname: string('Please enter your lastname'), firstname: string('Please enter your firstname') }),
  age: number('Please enter a number for your age'),
  contacts: array(object({ userId: string('Your contact must be defined'), text: maybe(string()) }));
})

const Component =()=>{
  // To valide form on each changes you can use onChange methode
  const { error, onChange } = useValidestAction(schema)
  return (
    <Form onChange={onChange}>
      <input name='name-lastname'/>
      {error?.name?.lastname && <div>{error.name.lastname}<div>}
      <input name='name-firstname'/>
      <input name='age'/>
      {error?.age && <div>{error.age}<div>}
      <input name='contacts-0-userId'/>
      <input name='contacts-0-text'/>
      <input name='contacts-1-userId'/>
      <input name='contacts-1-text'/>
      {error?.contacts?.[1]?.text && <div>{error.contacts.[1].text}<div>}
      <button type='submit'>Submit</button>
    </Form>
  )
}
```

### useValidestFetcher

```tsx
import { useValidestFetcher }from '@validest/remix/react';

const schema = object({
  name:object({ lastname: string('Please enter your lastname'), firstname: string('Please enter your firstname') }),
  age: number('Please enter a number for your age'),
  contacts: array(object({ userId: string('Your contact must be defined'), text: maybe(string()) }));
})

const Component =()=>{
  const { error, onSubmit,Form } = useValidestFetcher(schema,(data,e) =>{
  // make that you want after validation
})
return (
  <Form action='api/request' onSubmit={onSubmit}>
    <input name='name-lastname'/>
    {error?.name?.lastname && <div>{error.name.lastname}<div>}
    <input name='name-firstname'/>
    <input name='age'/>
    {error?.age && <div>{error.age}<div>}
    <input name='contacts-0-userId'/>
    <input name='contacts-0-text'/>
    <input name='contacts-1-userId'/>
    <input name='contacts-1-text'/>
    {error?.contacts?.[1]?.text && <div>{error.contacts.[1].text}<div>}
    <button type='submit'>Submit</button>
  </Form>
)}
```

## Back validation

In ActionFunction you can validate the data of the request with same schema and it will be typed.

```ts
import { validateRequest } from '@validest/remix/node';

export const action: ActionFunction = ({ request }) => {
  const data = validateRequest(request, schema);
  // your data is validated and typed
};
```

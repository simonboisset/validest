# Typescript validation for react form

Validation schema for typescript.

## Concept

This package take some conventions which are listed below :

### Uncontroled inputs

You don't need to control your input value to validate your form values on submit. However you can also use controled input but this will not have any impact of validation step.

### Use name propertie of inputs

To have access to form values without input control you must use the name propertie of each input.
If you have any value wich is not a real input value you must add an hidden input with the name you want.

### Name convention

Your form value will be an object with keys as each input names in your form.
You can define nested object and array with '-' in your name like this :

```ts
// List of you inputs names
'name-lastname';
'name-firstname';
'age';
'contacts-0-userId';
'contacts-0-text';
'contacts-1-userId';
'contacts-1-text';

// Your data will be like this

type Data = {
  name: { lastname: string; firstname: string };
  age: string;
  contacts: [{ userId: string; text: string }, { userId: string; text: string }];
};
```

## Quick start

Installation :

```sh
yarn add @ts-v/react
```

Code :

```tsx
import { array, number, object, maybe oneOf, string, validate ,useFormValidation } from '@ts-v/react';
// default import also works
import s , { useFormValidation }from '@ts-v/react';

const schema = object({
  name:object({ lastname: string('Please enter your lastname'), firstname: string('Please enter your firstname') }),
  age: number('Please enter a number for your age'),
  contacts: array(object({ userId: string('Your contact must be defined'), text: maybe(string()) }));
})

const Comonent =()=>{
  const { errors, onSubmit } = useFormValidation(schema,(data,e) =>{
  // make that you want after validation
})
return (
  <form onSubmit={onSubmit}>
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
  </form>
)}
```

The returned value of validate function will be typed.

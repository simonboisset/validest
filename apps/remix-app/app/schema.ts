import { number, object, string } from 'validest';

export const schema = object({
  name: string('Please enter your name'),
  age: number('Please enter your age'),
});

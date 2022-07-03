import { object } from '@ts-v/core';
import s from '@ts-v/kit';

export const schema = object({
  name: s.string('Please enter your name'),
  age: s.number('Please enter your age'),
});

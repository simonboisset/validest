import type { ActionFunction } from '@remix-run/node';
import { object } from '@ts-v/core';
import s from '@ts-v/kit';
import { useTsvAction } from '@ts-v/remix/dist/react';
import { validateRequest } from '@ts-v/remix/dist/node';

const schema = object({
  name: s.string('Please enter your name'),
  age: s.number('Please enter your age'),
});

export const action: ActionFunction = ({ request }) => {
  const data = validateRequest(request, schema);
  return data;
};

export default function Index() {
  const { onSubmit, errors, data } = useTsvAction(schema);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input name='name' placeholder='name' />
          <div style={{ fontSize: 12, color: 'red' }}>{errors?.name || null}</div>
        </div>
        <div>
          <input name='age' placeholder='age' />
          <div style={{ fontSize: 12, color: 'red' }}>{errors?.age || null}</div>
        </div>
        <button type='submit'>Submit</button>
      </form>
      {data && (
        <div style={{ color: 'green' }}>
          Welcome {data.name}! You are {data.age} years hold
        </div>
      )}
    </div>
  );
}

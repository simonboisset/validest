import { Form } from '@remix-run/react';
import { useValidestAction } from '@validest/remix';
import { actionValidation } from '~/action.server';
import { schema } from '~/schema';

export const action = actionValidation;

export default function Index() {
  const { onSubmit, error, data } = useValidestAction(schema);
  console.log(data);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <Form onSubmit={onSubmit} method="post">
        <div>
          <input name="name" placeholder="name" />
          <div style={{ fontSize: 12, color: 'red' }}>{error?.name || null}</div>
        </div>
        <div>
          <input name="age" placeholder="age" />
          <div style={{ fontSize: 12, color: 'red' }}>{error?.age || null}</div>
        </div>
        <button type="submit">Submit</button>
      </Form>
      {data && (
        <div style={{ color: 'green' }}>
          Welcome {data.name}! You are {data.age} years hold
        </div>
      )}
    </div>
  );
}

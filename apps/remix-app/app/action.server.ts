import type { ActionFunction } from '@remix-run/node';
import { validateRequest } from '@validest/remix/dist/node';
import { schema } from './schema';

export const actionValidation: ActionFunction = async ({ request }) => {
  try {
    const data = await validateRequest(request, schema);

    return data;
  } catch (error) {
    return error;
  }
};

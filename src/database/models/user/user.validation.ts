import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['full_name', 'email', 'password', 'user_name'],
  properties: {
    full_name: { type: 'string' },
    user_name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
};

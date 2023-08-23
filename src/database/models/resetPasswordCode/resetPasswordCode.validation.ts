import { JSONSchema } from 'objection';

export const ResetPasswordCodeValidation: JSONSchema = {
  type: 'object',
  title: 'ResetPasswordCode Schema Validation',
  required: ['expires_at', 'unique_id', 'email'],
  properties: {
    unique_id: { type: 'string' },
    email: { type: 'string' },
    expires_at: { type: 'string' },
    is_used: { type: 'boolean' },
  },
};

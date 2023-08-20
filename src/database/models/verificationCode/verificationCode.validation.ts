import { JSONSchema } from 'objection';

export const VerificationCodeValidation: JSONSchema = {
  type: 'object',
  title: 'VerificationCode Schema Validation',
  required: ['expires_at', 'user_id', 'code', 'email'],
  properties: {
    code: { type: 'number' },
    user_id: { type: 'number' },
    email: { type: 'string' },
    expires_at: { type: 'string' },
  },
};

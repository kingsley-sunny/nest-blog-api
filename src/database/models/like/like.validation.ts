import { JSONSchema } from 'objection';

export const LikeValidation: JSONSchema = {
  type: 'object',
  title: 'Like Schema Validation',
  required: ['post_id', 'user_id'],
  properties: {
    post_id: { type: 'number' },
    user_id: { type: 'number' },
  },
};

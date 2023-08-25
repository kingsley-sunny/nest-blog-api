import { JSONSchema } from 'objection';

export const ReplyValidation: JSONSchema = {
  type: 'object',
  title: 'Reply Schema Validation',
  required: ['post_id', 'user_id', 'text', 'recipient_id'],
  properties: {
    post_id: { type: 'number' },
    user_id: { type: 'number' },
    text: { type: 'string' },
    recipient_id: { type: 'number' },
  },
};

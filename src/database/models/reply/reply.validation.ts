import { JSONSchema } from 'objection';

export const ReplyValidation: JSONSchema = {
  type: 'object',
  title: 'Reply Schema Validation',
  required: ['comment_id', 'user_id', 'text', 'recipient_id'],
  properties: {
    comment_id: { type: 'number' },
    user_id: { type: 'number' },
    text: { type: 'string' },
    recipient_id: { type: 'number' },
  },
};

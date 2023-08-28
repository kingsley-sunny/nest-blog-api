import { JSONSchema } from 'objection';

export const CommentValidation: JSONSchema = {
  type: 'object',
  title: 'Comment Schema Validation',
  required: ['post_id', 'user_id', 'text'],
  properties: {
    post_id: { type: 'number' },
    user_id: { type: 'number' },
    text: { type: 'string' },
  },
};

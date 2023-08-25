import { JSONSchema } from 'objection';

export const PostValidation: JSONSchema = {
  type: 'object',
  title: 'Post Schema Validation',
  required: ['name', 'user_id', 'description', 'category_id', 'content'],
  properties: {
    title: { type: 'string' },
    user_id: { type: 'number' },
    description: { type: 'string' },
    category_id: { type: 'number' },
    content: { type: 'string' },
  },
};

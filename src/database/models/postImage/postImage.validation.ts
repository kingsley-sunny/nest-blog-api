import { JSONSchema } from 'objection';

export const PostImageValidation: JSONSchema = {
  type: 'object',
  title: 'PostImage Schema Validation',
  required: ['post_id', 'url'],
  properties: {
    post_id: { type: 'number' },
    blurhash: { type: 'string' },
    url: { type: 'string' },
  },
};

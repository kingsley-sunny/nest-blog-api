import { JSONSchema } from 'objection';

export const CommentLikeValidation: JSONSchema = {
  type: 'object',
  title: 'CommentLike Schema Validation',
  required: ['user_id', 'comment_id'],
  properties: {
    comment_id: { type: 'number' },
    user_id: { type: 'number' },
  },
};

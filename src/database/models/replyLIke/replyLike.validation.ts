import { JSONSchema } from 'objection';

export const ReplyLikeValidation: JSONSchema = {
  type: 'object',
  title: 'ReplyLike Schema Validation',
  required: ['user_id', 'reply_id'],
  properties: {
    reply_id: { type: 'number' },
    user_id: { type: 'number' },
  },
};

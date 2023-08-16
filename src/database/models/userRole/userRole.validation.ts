import { JSONSchema } from 'objection';

export const UserRoleValidation: JSONSchema = {
  type: 'object',
  title: 'userRole Schema Validation',
  required: ['user_id', 'role_id'],
  properties: {
    user_id: { type: 'number' },
    role_id: { type: 'number' },
  },
};

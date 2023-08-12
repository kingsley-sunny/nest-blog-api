import { JSONSchema } from 'objection';

export const RoleValidation: JSONSchema = {
  type: 'object',
  title: 'Role Schema Validation',
  required: ['title'],
  properties: {
    title: { type: 'string' },
  },
};

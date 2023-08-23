import { JSONSchema } from 'objection';

export const CategoryValidation: JSONSchema = {
  type: 'object',
  title: 'Category Schema Validation',
  required: ['name'],
  properties: {
    name: { type: 'string' },
  },
};

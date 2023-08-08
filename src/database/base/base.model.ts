import { randomUUID } from 'crypto';
import { Model, ModelOptions, QueryContext } from 'objection';

export class BaseModel extends Model {
  async $beforeInsert(queryContext: QueryContext): Promise<any> {
    queryContext.transaction.insert({
      uuid: randomUUID(),
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }

  async $beforeUpdate(
    opt: ModelOptions,
    queryContext: QueryContext,
  ): Promise<any> {
    queryContext.transaction.update({ updated_at: Date.now() });
  }
}

import { Model } from 'objection';

export class BaseModel extends Model {
  // async $beforeInsert(queryContext: QueryContext): Promise<any> {
  //   queryContext.transaction.insert({
  //     uuid: randomUUID(),
  //     created_at: Date.now(),
  //     updated_at: Date.now(),
  //   });
  // }
  // async $beforeUpdate(
  //   opt: ModelOptions,
  //   queryContext: QueryContext,
  // ): Promise<any> {
  //   queryContext.transaction.update({ updated_at: Date.now() });
  // }
  // static afterInsert(args: StaticHookArguments<any, any>) {
  //   const result = args.result[0];
  //   if (result.password) {
  //     delete result.password;
  //   }
  //   return result;
  // }
  // static async afterFind(args: StaticHookArguments<any, any>) {
  //   const result = args.result.map((data) => {
  //     if (data.password) {
  //       delete data.password;
  //     }
  //     return data;
  //   });
  //   return result;
  // }
}

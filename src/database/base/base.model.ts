import { randomUUID } from 'crypto';
import { Model, StaticHookArguments } from 'objection';

export class BaseModel extends Model {
  static afterInsert(args: StaticHookArguments<any, any>) {
    const result = args.result[0];
    if (result.password) {
      delete result.password;
    }
    return result;
  }

  static beforeInsert(args: StaticHookArguments<any, any>) {
    const items = args.inputItems.map((item) => ({
      ...item,
      uuid: randomUUID(),
    }));

    return items;
  }

  static async afterFind(args: StaticHookArguments<any, any>) {
    const result = args.result.map((data) => {
      if (data.password) {
        delete data.password;
      }
      return data;
    });
    return result;
  }
}

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
}

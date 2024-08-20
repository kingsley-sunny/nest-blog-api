import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { ILike } from './like.interface';
import { LikeValidation } from './like.validation';

export class LikeModel extends BaseModel implements ILike {
  public id: ILike['id'];
  public uuid: ILike['uuid'];
  public created_at: ILike['created_at'];
  public updated_at: ILike['updated_at'];

  public post_id: ILike['post_id'];
  public user_id: ILike['user_id'];

  static get tableName() {
    return DATABASE_TABLES.likes;
  }

  static get jsonSchema() {
    return LikeValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DATABASE_TABLES.likes}.user_id`,
          to: `${DATABASE_TABLES.users}.id`,
        },
      },
    };
  }
}

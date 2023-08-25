import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
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
}

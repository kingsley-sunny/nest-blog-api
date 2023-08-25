import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { ICommentLike } from './commentLike.interface';
import { CommentLikeValidation } from './commentLike.validation';

export class CommentLikeModel extends BaseModel implements ICommentLike {
  public id: ICommentLike['id'];
  public uuid: ICommentLike['uuid'];
  public created_at: ICommentLike['created_at'];
  public updated_at: ICommentLike['updated_at'];

  public comment_id: ICommentLike['comment_id'];
  public user_id: ICommentLike['user_id'];

  static get tableName() {
    return DATABASE_TABLES.comment_likes;
  }

  static get jsonSchema() {
    return CommentLikeValidation;
  }
}

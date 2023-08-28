import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IReplyLike } from './replyLike.interface';
import { ReplyLikeValidation } from './replyLike.validation';

export class ReplyLikeModel extends BaseModel implements IReplyLike {
  public id: IReplyLike['id'];
  public uuid: IReplyLike['uuid'];
  public created_at: IReplyLike['created_at'];
  public updated_at: IReplyLike['updated_at'];

  public reply_id: IReplyLike['reply_id'];
  public user_id: IReplyLike['user_id'];

  static get tableName() {
    return DATABASE_TABLES.reply_likes;
  }

  static get jsonSchema() {
    return ReplyLikeValidation;
  }
}

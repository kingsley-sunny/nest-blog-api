import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IReply } from './reply.interface';
import { ReplyValidation } from './reply.validation';
import { ReplyLikeModel } from '../replyLIke';

export class ReplyModel extends BaseModel implements IReply {
  public id: IReply['id'];
  public uuid: IReply['uuid'];
  public created_at: IReply['created_at'];
  public updated_at: IReply['updated_at'];

  public comment_id: IReply['comment_id'];
  public user_id: IReply['user_id'];
  public recipient_id: IReply['recipient_id'];
  public text: IReply['text'];

  static get tableName() {
    return DATABASE_TABLES.replies;
  }

  static get jsonSchema() {
    return ReplyValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      likes: {
        relation: Model.HasManyRelation,
        modelClass: ReplyLikeModel,
        join: {
          from: `${DATABASE_TABLES.replies}.id`,
          to: `${DATABASE_TABLES.reply_likes}.reply_id`,
        },
      },
    };
  }
}

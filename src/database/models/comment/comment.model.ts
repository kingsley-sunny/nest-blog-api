import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IComment } from './comment.interface';
import { CommentValidation } from './comment.validation';

export class CommentModel extends BaseModel implements IComment {
  public id: IComment['id'];
  public uuid: IComment['uuid'];
  public created_at: IComment['created_at'];
  public updated_at: IComment['updated_at'];

  public post_id: IComment['post_id'];
  public user_id: IComment['user_id'];
  public text: IComment['text'];

  static get tableName() {
    return DATABASE_TABLES.comments;
  }

  static get jsonSchema() {
    return CommentValidation;
  }
}

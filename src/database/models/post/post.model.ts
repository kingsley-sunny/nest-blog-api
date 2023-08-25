import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IPost } from './post.interface';
import { PostValidation } from './post.validation';

export class PostModel extends BaseModel implements IPost {
  public id: IPost['id'];
  public uuid: IPost['uuid'];
  public created_at: IPost['created_at'];
  public updated_at: IPost['updated_at'];

  public title: IPost['title'];
  public user_id: IPost['user_id'];
  public description: IPost['description'];
  public category_id: IPost['category_id'];
  public content: IPost['content'];

  static get tableName() {
    return DATABASE_TABLES.posts;
  }

  static get jsonSchema() {
    return PostValidation;
  }
}

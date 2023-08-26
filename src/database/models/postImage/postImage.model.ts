import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IPostImage } from './postImage.interface';
import { PostImageValidation } from './postImage.validation';

export class PostImageModel extends BaseModel implements IPostImage {
  public id: IPostImage['id'];
  public uuid: IPostImage['uuid'];
  public created_at: IPostImage['created_at'];
  public updated_at: IPostImage['updated_at'];

  public post_id: IPostImage['post_id'];
  public blurhash: IPostImage['blurhash'];
  public url: IPostImage['url'];

  static get tableName() {
    return DATABASE_TABLES.post_images;
  }

  static get jsonSchema() {
    return PostImageValidation;
  }
}

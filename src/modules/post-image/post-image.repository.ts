import { BaseRepository } from '../../database/base/base.repository';
import { IPostImage, PostImageModel } from '../../database/models/postImage';

export class PostImageRepository extends BaseRepository<Partial<IPostImage>> {
  constructor() {
    super(PostImageModel);
  }
}

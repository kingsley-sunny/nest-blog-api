import { BaseRepository } from '../../database/base/base.repository';
import { IPost, PostModel } from '../../database/models/post';

export class PostRepository extends BaseRepository<Partial<IPost>> {
  constructor() {
    super(PostModel);
  }
}

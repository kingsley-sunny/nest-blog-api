import { BaseRepository } from '../../database/base/base.repository';
import { CommentModel, IComment } from '../../database/models/comment';

export class CommentRepository extends BaseRepository<Partial<IComment>> {
  constructor() {
    super(CommentModel);
  }
}

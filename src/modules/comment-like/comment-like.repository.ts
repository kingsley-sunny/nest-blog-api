import { BaseRepository } from '../../database/base/base.repository';
import {
  CommentLikeModel,
  ICommentLike,
} from '../../database/models/commentLike';

export class CommentLikeRepository extends BaseRepository<
  Partial<ICommentLike>
> {
  constructor() {
    super(CommentLikeModel);
  }
}

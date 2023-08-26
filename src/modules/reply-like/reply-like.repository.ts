import { BaseRepository } from '../../database/base/base.repository';
import { IReplyLike, ReplyLikeModel } from '../../database/models/replyLIke';

export class ReplyLikeRepository extends BaseRepository<Partial<IReplyLike>> {
  constructor() {
    super(ReplyLikeModel);
  }
}

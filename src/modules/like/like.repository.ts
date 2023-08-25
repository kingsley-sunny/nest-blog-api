import { BaseRepository } from '../../database/base/base.repository';
import { ILike, LikeModel } from '../../database/models/like';

export class LikeRepository extends BaseRepository<Partial<ILike>> {
  constructor() {
    super(LikeModel);
  }
}

import { BaseRepository } from '../../database/base/base.repository';
import { IReply, ReplyModel } from '../../database/models/reply';

export class ReplyRepository extends BaseRepository<Partial<IReply>> {
  constructor() {
    super(ReplyModel);
  }
}

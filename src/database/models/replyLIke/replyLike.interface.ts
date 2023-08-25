import { IBase } from '../../base/base.interface';

export interface IReplyLike extends IBase {
  user_id: number;
  reply_id: number;
}

import { IBase } from '../../base/base.interface';

export interface ICommentLike extends IBase {
  user_id: number;
  comment_id: number;
}

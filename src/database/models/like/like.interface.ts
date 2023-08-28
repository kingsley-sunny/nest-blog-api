import { IBase } from '../../base/base.interface';

export interface ILike extends IBase {
  user_id: number;
  post_id: number;
}

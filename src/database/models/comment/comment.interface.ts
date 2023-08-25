import { IBase } from '../../base/base.interface';

export interface IComment extends IBase {
  user_id: number;
  post_id: number;
  text: string;
}

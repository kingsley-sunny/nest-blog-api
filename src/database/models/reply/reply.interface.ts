import { IBase } from '../../base/base.interface';

export interface IReply extends IBase {
  user_id: number;
  post_id: number;
  recipient_id: number;
  text: string;
}

import { IBase } from '../../base/base.interface';

export interface IPost extends IBase {
  title: string;
  user_id: number;
  description: string;
  category_id: number;
  content: string;
}

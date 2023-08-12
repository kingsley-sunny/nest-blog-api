import { IBase } from '../../base/base.interface';

export interface IUser extends IBase {
  full_name: string;
  user_name: string;
  email: string;
  password?: string;
}

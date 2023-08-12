import { IBase } from '../../base/base.interface';

export interface IUser extends IBase {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password?: string;
}

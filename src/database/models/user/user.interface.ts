import { IBaseInterface } from '../../base/base.interface';

export interface IUser extends IBaseInterface {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password?: string;
}

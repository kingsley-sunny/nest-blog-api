import { IBase } from '../../base/base.interface';

export interface IUserRole extends IBase {
  user_id: number;
  role_id: number;
}

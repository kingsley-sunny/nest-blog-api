import { IBase } from '../../base/base.interface';

export interface IResetPasswordCode extends IBase {
  unique_id: string;
  expires_at: string;
  email: string;
  is_used: boolean;
}

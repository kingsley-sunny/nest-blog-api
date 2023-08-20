import { IBase } from '../../base/base.interface';

export interface IVerificationCode extends IBase {
  code: number;
  user_id: number;
  expires_at: string | number | Date;
  email: string;
}

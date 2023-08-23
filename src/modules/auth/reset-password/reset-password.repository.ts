import { BaseRepository } from '../../../database/base/base.repository';
import { IResetPasswordCode } from '../../../database/models/resetPasswordCode/resetPasswordCode.interface';
import { ResetPasswordCodeModel } from '../../../database/models/resetPasswordCode/resetPasswordCode.model';

export class ResetPasswordRepository extends BaseRepository<
  Partial<IResetPasswordCode>
> {
  constructor() {
    super(ResetPasswordCodeModel);
  }
}

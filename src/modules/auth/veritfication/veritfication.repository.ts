import { BaseRepository } from '../../../database/base/base.repository';
import { IVerificationCode } from '../../../database/models/verificationCode/verificationCode.interface';
import { VerificationCodeModel } from '../../../database/models/verificationCode/verificationCode.model';

export class VerificationRepository extends BaseRepository<
  Partial<IVerificationCode>
> {
  constructor() {
    super(VerificationCodeModel);
  }
}

import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IVerificationCode } from './verificationCode.interface';
import { VerificationCodeValidation } from './verificationCode.validation';

export class VerificationCodeModel
  extends BaseModel
  implements IVerificationCode
{
  public id: IVerificationCode['id'];
  public uuid: IVerificationCode['uuid'];
  public created_at: IVerificationCode['created_at'];
  public updated_at: IVerificationCode['updated_at'];

  public user_id: IVerificationCode['user_id'];
  public code: IVerificationCode['code'];
  public email: IVerificationCode['email'];
  public expires_at: IVerificationCode['expires_at'];

  static get tableName() {
    return DATABASE_TABLES.verification_codes;
  }

  static get jsonSchema() {
    return VerificationCodeValidation;
  }
}

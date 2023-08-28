import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IResetPasswordCode } from './resetPasswordCode.interface';
import { ResetPasswordCodeValidation } from './resetPasswordCode.validation';

export class ResetPasswordCodeModel
  extends BaseModel
  implements IResetPasswordCode
{
  public id: IResetPasswordCode['id'];
  public uuid: IResetPasswordCode['uuid'];
  public created_at: IResetPasswordCode['created_at'];
  public updated_at: IResetPasswordCode['updated_at'];

  public unique_id: IResetPasswordCode['unique_id'];
  public email: IResetPasswordCode['email'];
  public expires_at: IResetPasswordCode['expires_at'];
  public is_used: IResetPasswordCode['is_used'];

  static get tableName() {
    return DATABASE_TABLES.reset_password_codes;
  }

  static get jsonSchema() {
    return ResetPasswordCodeValidation;
  }
}

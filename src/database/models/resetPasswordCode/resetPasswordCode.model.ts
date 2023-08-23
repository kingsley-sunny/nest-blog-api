import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IResetPasswordCode } from './resetPasswordCode.interface';
import { ResetPasswordCodeValidation } from './resetPasswordCode.validation';

export class ResetPasswordCodeModel
  extends BaseModel
  implements IResetPasswordCode
{
  @ApiProperty({ type: Number })
  public id: IResetPasswordCode['id'];
  @ApiProperty({ type: String })
  public uuid: IResetPasswordCode['uuid'];
  @ApiProperty({ type: Date })
  public created_at: IResetPasswordCode['created_at'];
  @ApiProperty({ type: Date })
  public updated_at: IResetPasswordCode['updated_at'];

  @ApiProperty({ type: String })
  public unique_id: IResetPasswordCode['unique_id'];
  @ApiProperty({ type: String })
  public email: IResetPasswordCode['email'];
  @ApiProperty({ type: Date })
  public expires_at: IResetPasswordCode['expires_at'];
  @ApiProperty({ type: Boolean })
  public is_used: IResetPasswordCode['is_used'];

  static get tableName() {
    return DATABASE_TABLES.reset_password_codes;
  }

  static get jsonSchema() {
    return ResetPasswordCodeValidation;
  }
}

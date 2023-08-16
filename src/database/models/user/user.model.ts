import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IUser } from './user.interface';
import { UserValidation } from './user.validation';

export class UserModel extends BaseModel implements IUser {
  public id: IUser['id'];
  public uuid: IUser['uuid'];
  public created_at: IUser['created_at'];
  public updated_at: IUser['updated_at'];

  public full_name: IUser['full_name'];
  public user_name: IUser['user_name'];
  public email: IUser['email'];
  public password: IUser['password'];

  static get tableName() {
    return DATABASE_TABLES.users;
  }

  static get jsonSchema() {
    return UserValidation;
  }
}

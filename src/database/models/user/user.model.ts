import { BaseModel } from '../../base/base.model';
import { IUser } from './user.interface';

export class User extends BaseModel implements IUser {
  public id: IUser['id'];
  public uuid: IUser['uuid'];
  public created_at: IUser['created_at'];
  public updated_at: IUser['updated_at'];

  public first_name: IUser['first_name'];
  public last_name: IUser['last_name'];
  public user_name: IUser['user_name'];
  public email: IUser['user_name'];
  public password: IUser['password'];

  static get tableName() {
    return 'users';
  }
}

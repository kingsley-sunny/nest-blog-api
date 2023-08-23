import { ApiResponseProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { RoleModel } from '../role/role.model';
import { UserRoleModel } from '../userRole/userRole.model';
import { IUser } from './user.interface';
import { UserValidation } from './user.validation';
import { UserPasswordOption } from './userPasswordOption';

function GetUser(one) {
  console.log(
    '🚀 ~~ file: user.model.ts:13 ~~ GetUser ~~ one, two, three, four:',
    Object.keys(one),
  );
}

@GetUser
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

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: `${DATABASE_TABLES.users}.id`,
          through: {
            from: `${DATABASE_TABLES.user_roles}.user_id`,
            to: `${DATABASE_TABLES.user_roles}.role_id`,
          },
          to: `${DATABASE_TABLES.roles}.id`,
        },
      },
      user_roles: {
        relation: Model.HasManyRelation,
        modelClass: UserRoleModel,
        join: {
          from: `${DATABASE_TABLES.users}.id`,
          to: `${DATABASE_TABLES.user_roles}.user_id`,
        },
      },
    };
  }

  $formatJson(json) {
    const isPasswordHidden = UserPasswordOption.getStatus();

    if (isPasswordHidden) {
      json = super.$formatJson(json);
      delete json.password;

      UserPasswordOption.hidePassword();
    }

    return json;
  }
}

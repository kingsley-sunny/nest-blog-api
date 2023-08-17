import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { RoleModel } from '../role/role.model';
import { UserModel } from '../user/user.model';
import { IUserRole } from './userRole.interface';
import { UserRoleValidation } from './userRole.validation';

export class UserRoleModel extends BaseModel implements IUserRole {
  public id: IUserRole['id'];
  public uuid: IUserRole['uuid'];
  public created_at: IUserRole['created_at'];
  public updated_at: IUserRole['updated_at'];

  public user_id: IUserRole['user_id'];
  public role_id: IUserRole['role_id'];

  static get tableName() {
    return DATABASE_TABLES.user_roles;
  }

  static get jsonSchema() {
    return UserRoleValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DATABASE_TABLES.user_roles}.user_id`,
          to: `${DATABASE_TABLES.users}.id`,
        },
      },
    };
  }
}

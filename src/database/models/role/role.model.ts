import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { IRole } from './role.interface';

export class RoleModel extends BaseModel implements IRole {
  public id: IRole['id'];
  public uuid: IRole['uuid'];
  public created_at: IRole['created_at'];
  public updated_at: IRole['updated_at'];

  public title: IRole['title'];

  static get tableName() {
    return DATABASE_TABLES.roles;
  }
}

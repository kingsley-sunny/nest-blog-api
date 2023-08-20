import { BaseRepository } from '../../database/base/base.repository';
import { IUserRole } from '../../database/models/userRole/userRole.interface';
import { UserRoleModel } from '../../database/models/userRole/userRole.model';

export class UserRoleRepository extends BaseRepository<Partial<IUserRole>> {
  constructor() {
    super(UserRoleModel);
  }
}

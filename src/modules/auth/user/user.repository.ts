import { BaseRepository } from '../../../database/base/base.repository';
import { IUser } from '../../../database/models/user/user.interface';
import { UserModel } from '../../../database/models/user/user.model';

export class UserRepository extends BaseRepository<Partial<IUser>> {
  constructor() {
    super(UserModel);
  }
}

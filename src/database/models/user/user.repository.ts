import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { IUser } from './user.interface';
import { User } from './user.model';

@Injectable()
export class UserRepository extends BaseRepository<Partial<IUser>> {
  constructor() {
    super(User);
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IUserRole } from '../../database/models/userRole/userRole.interface';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleRepository } from './user-role.repository';

@Injectable()
export class UserRoleService {
  @Inject(UserRoleRepository)
  userRoleRepository: UserRoleRepository;

  async create(data: CreateUserRoleDto) {
    let userRole: IUserRole;
    try {
      const { role_id, user_id } = data;
      userRole = await this.userRoleRepository.create({
        role_id,
        user_id,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return userRole;
  }

  async find(params: FetchQuery) {
    try {
      const userRoles = await this.userRoleRepository.find({}, params);
      return userRoles;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number, params: FetchQuery) {
    const userRole = await this.userRoleRepository.findOne({ id }, params);

    if (!userRole) {
      throw new NotFoundException('User Role not found');
    }

    return userRole;
  }

  async findById(id: number) {
    const userRole = await this.userRoleRepository.findById(id);
    if (!userRole) {
      throw new NotFoundException('User Role not found');
    }

    return userRole;
  }

  async delete(id: number) {
    return await this.userRoleRepository.delete(id);
  }
}

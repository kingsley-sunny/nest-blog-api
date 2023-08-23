import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
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
    Logger.log('create', 'UserRoleService');

    let userRole: IUserRole;
    try {
      const { role_id, user_id } = data;
      userRole = await this.userRoleRepository.create({
        role_id,
        user_id,
      });
    } catch (error) {
      Logger.log(error.message, 'UserRoleService');

      throw new InternalServerErrorException(error.message);
    }

    return userRole;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'UserRoleService');

    try {
      const userRoles = await this.userRoleRepository.find({}, params);
      return userRoles;
    } catch (error) {
      Logger.log(error.message, 'UserRoleService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number, params: FetchQuery) {
    Logger.log('findOne', 'UserRoleService');

    const userRole = await this.userRoleRepository.findOne({ id }, params);

    if (!userRole) {
      throw new NotFoundException('User Role not found');
    }

    return userRole;
  }

  async findById(id: number) {
    Logger.log('findById', 'UserRoleService');

    const userRole = await this.userRoleRepository.findById(id);
    if (!userRole) {
      throw new NotFoundException('User Role not found');
    }

    return userRole;
  }

  async delete(id: number) {
    Logger.log('delete', 'UserRoleService');

    return await this.userRoleRepository.delete(id);
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IUser } from '../../database/models/user/user.interface';
import { UtilsService } from '../../utils/utils.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  userRepository: UserRepository;

  async create(data: CreateUserDto) {
    Logger.log('create', 'UserService');

    let user: IUser;
    try {
      const { email, full_name, password, user_name } = data;

      const hashedPassword = await UtilsService.hashPassword(password);

      user = await this.userRepository.create({
        email,
        full_name,
        password: hashedPassword,
        user_name,
        user_roles: [{ role_id: 3 }],
      });
    } catch (error) {
      Logger.log(error.message, 'UserService');

      throw new InternalServerErrorException(error.message);
    }

    return user;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'UserService');

    try {
      const users = await this.userRepository.find({}, params, 'roles');

      return users;
    } catch (error) {
      Logger.log(error.message, 'UserService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IUser>) {
    Logger.log('findOne', 'UserService');

    const user = await this.userRepository.findOne(params);

    return user;
  }

  async findById(id: number) {
    Logger.log('findById', 'UserService');

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: number) {
    Logger.log('delete', 'UserService');

    return await this.userRepository.delete(id);
  }

  async findUserWithEmailOrUsername(emailOrUsername: string) {
    Logger.log('findUserWithEmailOrUsername', 'UserService');

    const user = await this.userRepository
      .findOne({ email: emailOrUsername }, {}, 'roles')
      .orWhere({ user_name: emailOrUsername });

    return user;
  }
}

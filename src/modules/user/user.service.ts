import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IUser } from '../../database/models/user/user.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  userRepository: UserRepository;

  async create(data: CreateUserDto) {
    let user: IUser;
    try {
      const { email, full_name, password, user_name } = data;
      user = await this.userRepository.create({
        email,
        full_name,
        password,
        user_name,
        user_roles: [{ role_id: 3 }],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return user;
  }

  async find(params: FetchQuery) {
    console.log(
      '🚀 ~~ file: user.service.ts:37 ~~ UserService ~~ find ~~ global.authNack:',
      global.authNack,
    );

    try {
      const users = await this.userRepository.find({}, params, 'roles');

      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IUser>) {
    const user = await this.userRepository.findOne(params);

    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async findUserWithEmailOrUsername(emailOrUsername: string) {
    const user = await this.userRepository
      .findOne({ email: emailOrUsername }, {}, 'roles')
      .orWhere({ user_name: emailOrUsername });

    return user;
  }
}

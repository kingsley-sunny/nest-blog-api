import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../../../database/models/user/user.interface';
import { UserService } from '../../user';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class SignUpService {
  @Inject(UserService)
  userService: UserService;

  async create(data: CreateUserDto) {
    Logger.log('Create', 'SignupService');
    const { email } = data;
    let user: IUser;

    user = await this.userService.findOne({
      email: email.toLowerCase(),
      user_name: data.user_name.toLowerCase(),
    });

    if (user) {
      throw new NotFoundException('This user already exists');
    }

    try {
      user = await this.userService.create({
        ...data,
        email: email.toLowerCase(),
        user_name: data.user_name.toLowerCase(),
      });

      return user;
    } catch (error) {
      Logger.error(error.message, 'SignupService');

      throw new InternalServerErrorException(error.message);
    }
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../../../database/models/user/user.interface';
import { UserService } from '../../user';
import { CreateUserDto } from '../../user/dto/create-user-dto';

@Injectable()
export class SignUpService {
  @Inject(UserService)
  userService: UserService;

  async create(data: CreateUserDto) {
    Logger.log('Create', 'SignupService');
    const { email } = data;
    let user: IUser;

    user = await this.throwIfUserExists(user, email);

    try {
      user = await this.userService.create(data);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async throwIfUserExists(user: IUser, email: string) {
    user = await this.userService.findOne({ email: email });

    if (user) {
      throw new NotFoundException('This user already exists');
    }
    return user;
  }
}

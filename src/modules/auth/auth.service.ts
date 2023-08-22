import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserPasswordOption } from '../../database/models/user/userPasswordOption';
import { UtilsService } from '../../utils/utils.service';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  @Inject(UserService)
  userService: UserService;

  async validateUser(username: string, password: string): Promise<any> {
    Logger.log('validateUser', 'AuthService');

    UserPasswordOption.showPassword();
    const user = await this.userService.findUserWithEmailOrUsername(username);

    if (!user) {
      throw new ConflictException('User do not exists');
    }

    const isPasswordMatched = await UtilsService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Password is incorrect');
    }

    delete user.password;

    return user;
  }
}

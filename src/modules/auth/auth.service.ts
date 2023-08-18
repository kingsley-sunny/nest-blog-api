import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  @Inject(UserService)
  userService: UserService;

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserWithEmailOrUsername(username);

    if (!user) {
      throw new ConflictException('User do not exists');
    }

    if (user && user.password !== password) {
      throw new BadRequestException('Password is incorrect');
    }

    delete user.password;

    return user;
  }
}

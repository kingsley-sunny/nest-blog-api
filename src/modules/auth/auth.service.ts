import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  @Inject(UserService)
  userService: UserService;

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserWithEmailOrUsername(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

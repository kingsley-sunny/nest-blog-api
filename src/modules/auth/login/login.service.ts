import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IRole } from '../../../database/models/role/role.interface';
import { IUser } from '../../../database/models/user/user.interface';
import { UserService } from '../../user';

@Injectable()
export class LoginService {
  @Inject(UserService)
  userService: UserService;
  @Inject(JwtService)
  jwtService: JwtService;

  async create(user: IUser & { roles: IRole }) {
    Logger.log('Create', 'LoginService');

    try {
      return {
        ...user,
        accessToken: this.jwtService.sign({
          id: user.id,
          uuid: user.uuid,
          email: user.email,
          username: user.user_name,
          roles: user.roles,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { IUser } from '../../../database/models/user/user.interface';
import { UserRepository } from '../../user';
import { JwtObject } from './jwtObject';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(UserRepository)
  userRepository: UserRepository;

  constructor() {
    super(JwtObject);
  }

  async validate({ email, uuid }: TokenPayload) {
    Logger.log('Validate', 'JwtStrategy');

    const user: IUser = await this.userRepository.findOne(
      { email, uuid },
      {},
      `[roles]`,
    );

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    return user;
  }
}

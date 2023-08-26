import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailAdapter } from '../../../adapters/email/email.adapter';
import { IUser } from '../../../database/models/user/user.interface';
import { UserService } from '../../user';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class SignUpService {
  @Inject(UserService)
  userService: UserService;
  @Inject(EmailAdapter)
  emailAdapter: EmailAdapter;
  @Inject(JwtService)
  jwtService: JwtService;

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

      this.emailAdapter.sendMail(
        'ezeobisunny51@gmail.com',
        'Welcome',
        `<h1>You are welcome To our blog website</h1>`,
      );

      return {
        ...user,
        accessToken: this.jwtService.sign({
          id: user.id,
          uuid: user.uuid,
          email: user.email,
          username: user.user_name,
        }),
      };
    } catch (error) {
      Logger.error(error.message, 'SignupService');

      throw new InternalServerErrorException(error.message);
    }
  }
}

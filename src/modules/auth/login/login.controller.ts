import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmailAdapter } from '../../../adapters/email/email.adapter';
import { BaseService } from '../../../base';
import { Public } from '../../../decorators/public.decorator';
import { LoginDto } from './dto';
import { LoginService } from './login.service';

@Public()
@UseGuards(AuthGuard('local'))
@Controller('auth/login')
export class LoginController {
  @Inject(LoginService)
  loginService: LoginService;
  @Inject(EmailAdapter)
  emailAdapter: EmailAdapter;

  @Post()
  async create(@Body() data: LoginDto, @Request() req: Request) {
    const user = await this.loginService.create((req as any).user);

    this.emailAdapter.sendMail(
      'ezeobisunny51@gmail.com',
      'Welcome',
      `<h1>You are fucking welcome and this mail is working</h1>`,
    );

    return BaseService.transformResponse(user, 'User Successfully logged in');
  }
}
